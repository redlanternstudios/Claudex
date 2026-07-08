#!/usr/bin/env python3
"""
set_deepseek_routing.py
Deprecated alias for the local only router.

DeepSeek is no longer the default. This wrapper exists so old commands keep
doing the safe thing: route every agent to local Ollama.
"""

from set_ollama_all import main


if __name__ == "__main__":
    print("set_deepseek_routing.py is deprecated. Using local Ollama defaults instead.")
    main()
