from fastapi import FastAPI

app = FastAPI(title="AI Orchestrator Placeholder")


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-orchestrator"}


@app.get("/ready")
def ready():
    return {"status": "ready", "service": "ai-orchestrator"}


@app.get("/")
def root():
    return {"service": "ai-orchestrator", "message": "placeholder running"}
