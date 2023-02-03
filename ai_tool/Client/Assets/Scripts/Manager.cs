using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Manager : MonoBehaviour
{
    public static Manager Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void Start()
    {
        Network.Put(Network.GetUrl(NetworkUrlEnum.Tokenize),
                    (new NetworkData("This is a sequences")).ToJson(),
                    TokenizeHandler);
    }

    private void TokenizeHandler(UnityWebRequest response)
    {
        Debug.Log("Response: " + response.downloadHandler.text);
    }
}
