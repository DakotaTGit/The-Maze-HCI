using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MoverUI : MonoBehaviour
{
    public Image latestSymbol;
    public Image[] previousSymbols;

    private Queue<Sprite> lastSymbols = new Queue<Sprite>();

    public void ReceiveSymbol(string symbolName)
    {
        Sprite symSprite = Resources.Load<Sprite>("Symbols/" + symbolName);

        if (!symSprite)
        {
            Debug.Log("Could not load symbol " + symbolName);
            return;
        }

        lastSymbols.Enqueue(symSprite);

        if (lastSymbols.Count > previousSymbols.Length + 1)
        {
            lastSymbols.Dequeue();
        }

        UpdateDisplay();
    }

    private void UpdateDisplay()
    {
        Sprite[] arr = lastSymbols.ToArray();

        //newest 
        latestSymbol.sprite = arr[arr.Length - 1];

        //old ones 
        int prevIndex = 0;

        for (int i = arr.Length - 2; i >= 0 && prevIndex < previousSymbols.Length; i--)
        {
            previousSymbols[prevIndex].sprite = arr[i];
            prevIndex++;
        }
    }
}
