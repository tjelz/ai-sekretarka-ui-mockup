/**
 * ElevenLabs API Client
 * Handles all interactions with ElevenLabs API for AI voice agent management
 */

import { z } from 'zod';

// Environment validation
const elevenLabsEnvSchema = z.object({
  ELEVENLABS_API_KEY: z.string().min(1, 'ElevenLabs API key is required'),
  ELEVENLABS_BASE_URL: z.string().url().default('https://api.elevenlabs.io'),
  ELEVENLABS_PROJECT_ID: z.string().optional(),
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
  conversation_config?: {
    speaking_style?: string;
    response_length?: 'short' | 'medium' | 'long';
    temperature?: number;
  };
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
  private projectId?: string;

  constructor() {
    const env = elevenLabsEnvSchema.parse({
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
      ELEVENLABS_BASE_URL: process.env.ELEVENLABS_BASE_URL,
      ELEVENLABS_PROJECT_ID: process.env.ELEVENLABS_PROJECT_ID,
    });

    this.apiKey = env.ELEVENLABS_API_KEY;
    this.baseUrl = env.ELEVENLABS_BASE_URL;
    this.projectId = env.ELEVENLABS_PROJECT_ID;
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

    const responseBody = await response.text();

    if (!response.ok) {
      let errorDetail: any = {};
      try {
        errorDetail = responseBody ? JSON.parse(responseBody) : {};
      } catch {
        errorDetail = { raw: responseBody };
      }

      // Suppress 404 logs for metrics and conversations as they are expected for new agents
      if (response.status !== 404) {
        console.error("[ElevenLabs] Request failed", {
          endpoint,
          status: response.status,
          statusText: response.statusText,
          detail: errorDetail,
          payloadPreview: typeof options.body === "string" ? options.body.slice(0, 500) : undefined
        });
      }

      const error = new Error(
        `ElevenLabs API error: ${response.status} - ${errorDetail.detail || response.statusText}`
      );
      (error as any).status = response.status; // Attach status to error object
      throw error;
    }

    if (!responseBody) {
      return {} as T;
    }

    return JSON.parse(responseBody) as T;
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
    return this.request<Agent>('/v1/convai/agents/create', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async createKnowledgeBaseDocumentFromUrl(params: { url: string; name?: string }) {
    return this.request<{ id: string; name: string }>('/v1/convai/knowledge-base/url', {
      method: 'POST',
      body: JSON.stringify(params)
    })
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
