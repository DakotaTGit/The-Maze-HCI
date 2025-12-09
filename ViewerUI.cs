using UnityEngine;
using UnityEngine.UI;

public class ViewerUI : MonoBehaviour
{
    [Header("Symbol Buttons")]
    public Button[] symbolButtons; // Assign buttons in Inspector
    public string[] symbolNames;   // Names of PNGs matching Resources/Symbols/

    public MoverUI mover;  // Drag the MoverUI object here

    private void Start()
    {
        if (symbolButtons.Length != symbolNames.Length)
        {
            Debug.LogError("Symbol buttons and symbol names arrays must match in length!");
            return;
        }

        for (int i = 0; i < symbolButtons.Length; i++)
        {
            int index = i;
            symbolButtons[i].onClick.AddListener(() => SendSymbol(symbolNames[index]));
        }
    }

    private void SendSymbol(string symbolName)
    {
        if (mover != null)
            mover.ReceiveSymbol(symbolName);
        else
            Debug.LogError("ViewerUI is missing reference to MoverUI!");
    }
}
