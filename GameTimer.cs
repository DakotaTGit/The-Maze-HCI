using UnityEngine;
using TMPro;

public class GameTimer : MonoBehaviour
{
    [SerializeField] private TMP_Text timerText; // assign in inspector
    private float elapsed = 0f;
    private bool running = true;

    void Update()
    {
        if (!running) return;
        elapsed += Time.deltaTime;
        // Format mm:ss.t  example -> 01:23.4
        int minutes = (int)(elapsed / 60f);
        float seconds = elapsed - minutes * 60;
        timerText.text = string.Format("{0:00}:{1:00.0}", minutes, seconds);
    }

    // Optional controls
    public void ResetTimer()
    {
        elapsed = 0f;
    }

    public void PauseTimer() => running = false;
    public void ResumeTimer() => running = true;
}
