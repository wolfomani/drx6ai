import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const payload = await request.json()
    const headers = Object.fromEntries(request.headers.entries())

    console.log("Webhook received:", {
      event: headers["x-github-event"],
      delivery: headers["x-github-delivery"],
      payload: payload,
    })

    // Handle different GitHub events
    switch (headers["x-github-event"]) {
      case "push":
        console.log("Push event received:", payload.commits?.length || 0, "commits")
        break
      case "workflow_run":
        console.log("Workflow run event:", payload.workflow_run?.status)
        break
      default:
        console.log("Unhandled event type:", headers["x-github-event"])
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint is active",
    webhook_url: process.env.WEBHOOK_URL,
    domain: process.env.VERCEL_DOMAIN,
    repo: process.env.GITHUB_REPO,
  })
}
