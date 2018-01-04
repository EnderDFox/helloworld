/*
*/
class SDKAdapter{
}
class SDKAdapterFG{
    public static Transition_Play(target:fairygui.Transition,onComplete?: Function, onCompleteObj?: any, onCompleteParam?: any, times?: number, delay?: number): void{
        target.play(new Handler(onComplete,onCompleteObj,onCompleteParam),times,delay);
    }
    public static GObject_OnClick(target:fairygui.GObject, thisObj: any, listener: Function):void{
        target.onClick(thisObj,listener);
    }
}