import { NextRequest, NextResponse } from "next/server"
import { getElevenLabsClient } from "@/lib/elevenlabs/client"
import { auth } from "@/auth"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { agentId } = params

    if (!agentId) {
      return NextResponse.json({ error: "Agent ID is required" }, { status: 400 })
    }

    const body = await request.json()

    // Validate the request body
    const {
      name,
      greeting_message,
      voice_id,
      context,
      conversation_config
    } = body

    if (!name || !voice_id) {
      return NextResponse.json(
        { error: "Agent name and voice ID are required" },
        { status: 400 }
      )
    }

    const elevenLabsClient = getElevenLabsClient()

    // Prepare the update payload for ElevenLabs
    const updatePayload = {
      name,
      voice_id,
      description: `Updated agent configuration for ${name}`,
      greeting_message,
      context,
      conversation_config: conversation_config || {
        speaking_style: "friendly",
        response_length: "medium",
        temperature: 0.4
      }
    }

    // Update the agent in ElevenLabs
    const updatedAgent = await elevenLabsClient.updateAgent(agentId, updatePayload)

    return NextResponse.json({
      success: true,
      agent: updatedAgent
    })

  } catch (error) {
    console.error("Error updating agent configuration:", error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Failed to update agent configuration" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}





