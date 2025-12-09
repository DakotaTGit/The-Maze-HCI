using System;
using System.Collections.Generic;
using UnityEngine;

public class SymbolManager : MonoBehaviour
{
    public static SymbolManager Instance;

    // Event for symbol sent
    public event Action<string> OnSymbolSent;

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    // Call this to "send" a symbol
    public void SendSymbol(string symbol)
    {
        OnSymbolSent?.Invoke(symbol);
    }
}
