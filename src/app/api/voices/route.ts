import { NextResponse } from "next/server"
import { getElevenLabsClient } from "@/lib/elevenlabs/client"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const elevenLabsClient = getElevenLabsClient()
    const voices = await elevenLabsClient.getVoices()

    return NextResponse.json({
      voices,
      success: true
    })

  } catch (error) {
    console.error("Error fetching voices:", error)

    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 }
    )
  }
}





