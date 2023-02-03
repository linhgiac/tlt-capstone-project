using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using System.Text.RegularExpressions;
using UniRx;

public class NER : MonoBehaviour
{
    [SerializeField] private NERToken tokenPrefab;
    [SerializeField] private Transform tokensContainer;
    [SerializeField] private TMP_InputField sentenceInput;
    [SerializeField] private TMP_InputField tokensLabel;

    private List<NERToken> currentTokens = new List<NERToken>();
    private CompositeDisposable disposables = new CompositeDisposable();

    private void Start()
    {
        sentenceInput.onEndEdit.AddListener(HandleInput);
    }

    private void HandleInput(string input)
    {
        Network.Put(Network.GetUrl(NetworkUrlEnum.Tokenize),
                    (new NetworkData(input)).ToJson(),
                    HandleResponse).AddTo(disposables);
    }

    private void OnDestroy()
    {
        disposables.Clear();
    }

    private void HandleResponse(UnityWebRequest response)
    {
        Debug.Log("Response: " + response.downloadHandler.text);

        string responseData = response.downloadHandler.text;

        Regex rx = new Regex(@"\[.*\]");

        Match match = rx.Match(responseData);

        string tokens = match.Value;
        tokens = tokens.Remove(0, 1);
        tokens = tokens.Remove(tokens.Length - 1, 1);
        string[] tokenSplit = tokens.Split(',');

        foreach (NERToken tokenObject in currentTokens)
        {
            Destroy(tokenObject.gameObject);
        }
        currentTokens.Clear();

        foreach (string token in tokenSplit)
        {
            NERToken tokenObject = Instantiate(tokenPrefab, tokensContainer);
            tokenObject.Init(token, UpdateTokensLabel);
            currentTokens.Add(tokenObject);
        }
        UpdateTokensLabel();
    }

    private void UpdateTokensLabel()
    {
        string labels = "";
        foreach (NERToken token in currentTokens)
        {
            labels += token.Label + " ";
        }
        labels.Remove(labels.Length - 1);
        tokensLabel.text = labels;
    }
}
