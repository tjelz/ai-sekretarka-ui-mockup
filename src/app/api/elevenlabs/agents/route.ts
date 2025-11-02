/**
 * ElevenLabs Agents API Route
 * Handles CRUD operations for AI agents
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getElevenLabsClient } from '@/lib/elevenlabs/client';
import { z } from 'zod';

const createAgentSchema = z.object({
  name: z.string().min(1).max(100),
  voice_id: z.string().min(1),
  description: z.string().optional(),
  greeting_message: z.string().optional(),
  context: z.string().optional(),
  language: z.string().default('en'),
  conversation_config: z
    .object({
      speaking_style: z.string().optional(),
      response_length: z.enum(['short', 'medium', 'long']).optional(),
      temperature: z.number().min(0).max(1).optional(),
    })
    .optional(),
});

// GET /api/elevenlabs/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getElevenLabsClient();
    const agents = await client.listAgents();

    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// POST /api/elevenlabs/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createAgentSchema.parse(body);

    const client = getElevenLabsClient();
    const agent = await client.createAgent(validatedData);

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
