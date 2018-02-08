package main

//protoc.exe --plugin=protoc-gen-go=C:\Users\23262\go\bin\protoc-gen-go.exe  --go_out=. ./pb.proto
//protobuf\protoc.exe --plugin=protoc-gen-go=C:\Users\23262\go\bin\protoc-gen-go.exe  --go_out=. ./protobuf/test.proto
//protoc --proto_path=watchPath --go_out=outPath  watchPath+*.proto
//protoc --go_out=plugins=grpc:../../FishServer/src/pb *.proto 这个事bash的
import (
	"fmt"
	"log"
	"net/http"

	"github.com/golang/protobuf/proto"

	"golang.org/x/net/websocket"
)

func echoHandler(ws *websocket.Conn) {
	for {
		msg := make([]byte, 512)
		fmt.Printf("Receive:msg\n")
		n, err := ws.Read(msg)
		if err != nil {
			fmt.Printf("Parse error %s\n", err)
			// log.Fatal(err)
		}
		fmt.Printf("Parse Success: %s\n", msg[:n])
		// ---
		sendmsg := "[" + string(msg[:n]) + "]"
		m, err := ws.Write([]byte(sendmsg))
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Send: %s\n", msg[:m])
	}
}

func main() {
	testProto()
	// testWs()
}

func testWs() {
	fmt.Println("hello ws echo")
	// http.Handle("/", websocket.Handler(echoHandler))
	// http.Handle("/echo", websocket.Handler(echoHandler))
	http.Handle("/socket.io/", websocket.Handler(echoHandler))
	// http.Handle("/", http.FileServer(http.Dir(".")))

	// err := http.ListenAndServe(":8080", nil)
	err := http.ListenAndServe(":1024", nil)

	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

//go run main.go test.pb.go
func testProto() {
	// 创建一个消息 Test
	test := &Test{
		// 使用辅助函数设置域的值
		Label: proto.String("hello"),
		Type:  proto.Int32(17),
	}

	fmt.Printf("ori: Label:%s Type:%d\n", test.GetLabel(), test.GetType())
	*(test.Label) = "hello go"
	*(test.Type) = 18
	fmt.Printf("ori change: Label:%s Type:%d\n", test.GetLabel(), test.GetType())

	// 进行编码
	data, err := proto.Marshal(test)
	if err != nil {
		log.Fatal("marshaling error: ", err)
	}

	fmt.Printf("encode: Binary Len:%d\n", len(data))

	// 进行解码
	newTest := &Test{}
	err = proto.Unmarshal(data, newTest)
	if err != nil {
		log.Fatal("unmarshaling error: ", err)
	}

	fmt.Printf("decode: Label:%s Type:%d\n", test.GetLabel(), test.GetType())

	// 测试结果
	if test.GetLabel() != newTest.GetLabel() {
		log.Fatalf("data mismatch %q != %q", test.GetLabel(), newTest.GetLabel())
	}
}
