/**
 * ElevenLabs Single Agent API Route
 * Handles operations for a specific agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getElevenLabsClient } from '@/lib/elevenlabs/client';
import { z } from 'zod';

const updateAgentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  voice_id: z.string().min(1).optional(),
  description: z.string().optional(),
  greeting_message: z.string().optional(),
  context: z.string().optional(),
  language: z.string().optional(),
  conversation_config: z
    .object({
      speaking_style: z.string().optional(),
      response_length: z.enum(['short', 'medium', 'long']).optional(),
      temperature: z.number().min(0).max(1).optional(),
    })
    .optional(),
});

// GET /api/elevenlabs/agents/[agentId] - Get specific agent
export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getElevenLabsClient();
    const agent = await client.getAgent(params.agentId);

    return NextResponse.json({ agent });
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}

// PATCH /api/elevenlabs/agents/[agentId] - Update agent
export async function PATCH(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateAgentSchema.parse(body);

    const client = getElevenLabsClient();
    const agent = await client.updateAgent(params.agentId, validatedData);

    return NextResponse.json({ agent });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating agent:', error);
    return NextResponse.json(
      { error: 'Failed to update agent' },
      { status: 500 }
    );
  }
}

// DELETE /api/elevenlabs/agents/[agentId] - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getElevenLabsClient();
    await client.deleteAgent(params.agentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting agent:', error);
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    );
  }
}
