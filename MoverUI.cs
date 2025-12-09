using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MoverUI : MonoBehaviour
{
    public Image latestSymbol;
    public Image[] previousSymbols;

    private Queue<Sprite> lastSymbols = new Queue<Sprite>();

    public void RecieveSymbol(string symbolName)
    {
        Sprite symSprite = Resources.Load<Sprite>("Symbols/" + symbolName);

        if (!symSprite)
        {
            Debug.Log("Could not load symbol " + symbolName);
            return;
        }

        lastSymbols.Enqueue(symSprite);
        if (lastSymbols.Count > previousSymbols.Length) lastSymbols.Dequeue();
    }

    public void DisplaySymbol(string symbolName)
    {
        // load the sprite
        // Sprite symSprite = Resources.Load<Sprite>("Symbols/" + symbolName);

        // latest
        latestSymbol.sprite = lastSymbols.Peek();

        // previous queue
        int i = 0;
        foreach (var s in lastSymbols)
        {
            previousSymbols[i].sprite = s;
            i++;
        }
    }
}
