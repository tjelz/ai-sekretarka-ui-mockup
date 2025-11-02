/**
 * ElevenLabs API Client
 * Handles all interactions with ElevenLabs API for AI voice agent management
 */

import { z } from 'zod';

// Environment validation
const elevenLabsEnvSchema = z.object({
  ELEVENLABS_API_KEY: z.string().min(1, 'ElevenLabs API key is required'),
  ELEVENLABS_BASE_URL: z.string().url().default('https://api.elevenlabs.io'),
});

// Type definitions
export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
  labels?: Record<string, string>;
}

export interface Agent {
  agent_id: string;
  name: string;
  voice_id: string;
  description?: string;
  greeting_message?: string;
  context?: string;
  language?: string;
  created_at: string;
  updated_at: string;
}

export interface AgentConfig {
  name: string;
  voice_id: string;
  description?: string;
  greeting_message?: string;
  context?: string;
  language?: string;
  conversation_config?: {
    speaking_style?: string;
    response_length?: 'short' | 'medium' | 'long';
    temperature?: number;
  };
}

export interface ConversationMetrics {
  agent_id: string;
  total_conversations: number;
  total_duration_seconds: number;
  average_duration_seconds: number;
  success_rate: number;
  period_start: string;
  period_end: string;
}

export class ElevenLabsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    const env = elevenLabsEnvSchema.parse({
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
      ELEVENLABS_BASE_URL: process.env.ELEVENLABS_BASE_URL,
    });

    this.apiKey = env.ELEVENLABS_API_KEY;
    this.baseUrl = env.ELEVENLABS_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `ElevenLabs API error: ${response.status} - ${error.detail || response.statusText}`
      );
    }

    return response.json();
  }

  // Voice Management
  async getVoices(): Promise<Voice[]> {
    const data = await this.request<{ voices: Voice[] }>('/v1/voices');
    return data.voices;
  }

  async getVoice(voiceId: string): Promise<Voice> {
    return this.request<Voice>(`/v1/voices/${voiceId}`);
  }

  // Agent Management
  async listAgents(): Promise<Agent[]> {
    const data = await this.request<{ agents: Agent[] }>('/v1/convai/agents');
    return data.agents;
  }

  async getAgent(agentId: string): Promise<Agent> {
    return this.request<Agent>(`/v1/convai/agents/${agentId}`);
  }

  async createAgent(config: AgentConfig): Promise<Agent> {
    return this.request<Agent>('/v1/convai/agents', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async updateAgent(agentId: string, config: Partial<AgentConfig>): Promise<Agent> {
    return this.request<Agent>(`/v1/convai/agents/${agentId}`, {
      method: 'PATCH',
      body: JSON.stringify(config),
    });
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.request(`/v1/convai/agents/${agentId}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getAgentMetrics(
    agentId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ConversationMetrics> {
    const params = new URLSearchParams({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });

    return this.request<ConversationMetrics>(
      `/v1/convai/agents/${agentId}/metrics?${params}`
    );
  }

  // Conversation Management
  async getConversationHistory(
    agentId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    return this.request(
      `/v1/convai/agents/${agentId}/conversations?${params}`
    );
  }
}

// Singleton instance
let elevenLabsClient: ElevenLabsClient | null = null;

export function getElevenLabsClient(): ElevenLabsClient {
  if (!elevenLabsClient) {
    elevenLabsClient = new ElevenLabsClient();
  }
  return elevenLabsClient;
}
