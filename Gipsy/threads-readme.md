# Threads Content Automation

AI-powered personal branding system for automated Threads content publishing with multi-agent pipeline and Telegram-based approval flow.

![Workflow](workflow.png)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        n8n Orchestrator                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                  │
│  │ Strategist│───▶│  Writer  │───▶│  Editor  │                  │
│  │  (AI)     │    │  (AI)    │    │  (AI)    │                  │
│  └──────────┘    └──────────┘    └──────────┘                  │
│        │               │               │                        │
│        ▼               ▼               ▼                        │
│  ┌─────────────────────────────────────────┐                   │
│  │         Supabase Database               │                   │
│  │   (Content, Personas, Schedule)         │                   │
│  └─────────────────────────────────────────┘                   │
│                      │                                          │
│                      ▼                                          │
│  ┌─────────────────────────────────────────┐                   │
│  │      Telegram Approval Channel          │                   │
│  │   (Two-way revision & approval)         │                   │
│  └─────────────────────────────────────────┘                   │
│                      │                                          │
│                      ▼                                          │
│  ┌─────────────────────────────────────────┐                   │
│  │      Threads Publishing (Zernio)        │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Features

- **Multi-Agent Pipeline**: Strategist → Writer → Editor workflow for content generation
- **Multi-Persona System**: Dynamic persona selection with content pillar rotation
- **Telegram Approval**: Two-way content revision via natural conversation
- **Topic Deduplication**: Automatic avoidance of repeated topics
- **CLI Persona Generator**: Claude API-powered tool for creating new personas
- **Duplicate Prevention**: Production-grade safeguards against double-publishing

## Tech Stack

| Component | Technology |
|-----------|------------|
| Orchestration | n8n |
| AI Engine | Google Gemini |
| Database | Supabase |
| Approval | Telegram Bot |
| Publishing | Zernio API (Threads) |
| CLI Tool | Claude API |

## Multi-Persona System

The system supports multiple content pillars, each with its own:
- **Persona**: Unique voice and writing style
- **Tone**: Platform-appropriate communication
- **Schedule**: Optimized posting times
- **Topics**: Focused content categories

On each generation cycle, the system randomly selects one persona, allowing a single account to dynamically represent different facets of the owner's identity.

## CLI Tool

Generate new persona configurations with a single command:

```bash
node generate-persona.js --name "Tech Leader" --tone "professional" --topics "engineering,architecture"
```

The CLI validates structure and inserts directly into Supabase - no manual SQL required.

## Content Flow

1. **Scheduled Trigger** → n8n initiates content generation cycle
2. **Strategist Agent** → Selects persona, generates topic and outline
3. **Writer Agent** → Creates full carousel content with captions
4. **Editor Agent** → Reviews, refines, and ensures quality
5. **Approval** → Sent to Telegram for human review
6. **Publishing** → Approved content posted to Threads via Zernio API

## Setup

### Prerequisites

- n8n instance (self-hosted or cloud)
- Supabase project
- Telegram Bot Token
- Zernio API key
- Google Gemini API key

### Environment Variables

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
GEMINI_API_KEY=your_gemini_key
ZERNIO_API_KEY=your_zernio_key
```

### Import Workflow

1. Open n8n dashboard
2. Import `workflow.json`
3. Configure credentials in n8n settings
4. Activate the workflow

## License

MIT
