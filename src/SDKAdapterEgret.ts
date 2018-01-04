/*
*/
class SDKAdapter{
}
class SDKAdapterFG{
    public static Transition_Play(target:fairygui.Transition,onComplete?: Function, onCompleteObj?: any, onCompleteParam?: any, times?: number, delay?: number): void{
        target.play(onComplete,onCompleteObj,onCompleteParam,times,delay);
    }
    public static GObject_addClickListener(target:fairygui.GObject,listener: Function, thisObj: any=null): void{
        thisObj!=null || (thisObj=target);
        target.addClickListener(listener,thisObj);
    }
    public static GObject_addEventListener(target:fairygui.GObject, type: string, listener: Function, thisObject: any=null): void{
        thisObject!=null || (thisObject=target);
        target.addEventListener(type,listener,thisObject);
    }
}