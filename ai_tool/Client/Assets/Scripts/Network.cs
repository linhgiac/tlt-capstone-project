using UniRx;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Net;

public enum NetworkUrlEnum
{
    Tokenize
}

public class NetworkData
{
    private string data;

    public string Data => data;

    public NetworkData(string data)
    {
        this.data = data;
    }

    public string ToJson()
    {
        Debug.Log($"{{\"data\":\"{data}\"}}");
        return $"{{\"data\":\"{data}\"}}";
    }
}

public class Network
{
    public static string Host = "http://localhost:8000/";
    public static IObservable<UnityWebRequest> SendRequest(
    string url,
    Func<string, UnityWebRequest> webRequestFunc,
    Dictionary<string, string> headers = null)
    {
        return Observable.Create<UnityWebRequest>(observer =>
        {
            var request = webRequestFunc(url);
            var requestDisposable = new SingleAssignmentDisposable();

            // Set default header to accept json
            request.SetRequestHeader("Content-Type", "application/json");
            request.SetRequestHeader("Accept", "application/json");

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    request.SetRequestHeader(header.Key, header.Value);
                }
            }

            IObservable<UnityWebRequest> HandleResult()
            {
                if (requestDisposable.IsDisposed)
                {
                    return Observable.Throw<UnityWebRequest>(
                        new OperationCanceledException("Already disposed."));
                }

                if (request.result != UnityWebRequest.Result.Success)
                {
                    return Observable.Throw<UnityWebRequest>(new WebException(request.error));
                }

                if (request.responseCode != (long)HttpStatusCode.OK)
                {
                    return Observable.Throw<UnityWebRequest>(
                        new WebException($"{request.responseCode} - {request.downloadHandler.text}"));
                }

                return Observable.Return(request);
            }

            requestDisposable.Disposable = request
                .SendWebRequest()
                .AsAsyncOperationObservable()
                .ContinueWith(_ => HandleResult())
                .CatchIgnore((OperationCanceledException _) => observer.OnCompleted())
                .Subscribe(result =>
                {
                    observer.OnNext(result);
                    observer.OnCompleted();
                }, observer.OnError);

            return new CompositeDisposable(request, requestDisposable);
        });
    }

    public static IDisposable Get(string url, Action<UnityWebRequest> callback)
    {
        return SendRequest(url, UnityWebRequest.Get).Subscribe(callback);
    }

    public static IDisposable Put(string url, string data, Action<UnityWebRequest> callback)
    {
        return SendRequest(url, uri => UnityWebRequest.Put(uri, data)).Subscribe(callback);
    }

    public static string GetUrl(NetworkUrlEnum type)
    {
        switch (type)
        {
            case NetworkUrlEnum.Tokenize:
                return Host + "bert_tokenizer/tokenize/";
            default:
                return Host;
        }
    }
}