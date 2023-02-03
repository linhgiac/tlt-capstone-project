using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class NERToken : MonoBehaviour
{
    [SerializeField] private TMP_InputField tokenText;
    [SerializeField] private TMP_InputField tokenLabel;

    public int Label => int.Parse(tokenLabel.text);

    public void Init(string text, System.Action onLabelChange)
    {
        tokenText.text = text;
        tokenLabel.onEndEdit.AddListener(_ => onLabelChange());
    }
}
