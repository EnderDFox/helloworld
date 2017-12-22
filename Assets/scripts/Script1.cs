using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Script1 : MonoBehaviour {

    float _OffsetUV = 0f;
    SkinnedMeshRenderer mr;
    // Use this for initialization
    void Start () {
        this.mr = this.GetComponentInChildren<SkinnedMeshRenderer>();
	}
	
	// Update is called once per frame
	void Update () {
        _OffsetUV = Mathf.Repeat(_OffsetUV - 0.005f, 1f) ;
        this.mr.material.SetFloat("_OffsetUV", _OffsetUV);
    }
}
