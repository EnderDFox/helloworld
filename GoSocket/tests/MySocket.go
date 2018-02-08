package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"os"
)

func main_ms() {
	fmt.Println("Hello Go Socket")

	//建立socket，监听端口
	netListen, err := net.Listen("tcp", "localhost:1024")
	CheckError(err)
	defer netListen.Close()

	Log("Waiting for clients")
	for {
		conn, err := netListen.Accept()
		if err != nil {
			continue
		}

		Log(conn.RemoteAddr().String(), " tcp connect success")
		handleConnection(conn)
	}
}

//处理连接
func handleConnection(conn net.Conn) {

	buffer := make([]byte, 4000)

	for {

		n, err := conn.Read(buffer)

		if err != nil {
			Log(conn.RemoteAddr().String(), " connection error: ", err)
			return
		}
		fmt.Println("receive data string len:", n, buffer[:n])
		// Log(conn.RemoteAddr().String(), "receive data string:\n", n)
		// Log(conn.RemoteAddr().String(), "receive data string:\n", n, string(buffer[0:3]), buffer[4:7], buffer[8:11], buffer[12:n])
		buf := bytes.NewBuffer(buffer)
		var zero int32
		binary.Read(buf, binary.LittleEndian, &zero) // 0
		var msgLen int32
		binary.Read(buf, binary.LittleEndian, &msgLen)
		var msgNo int32
		binary.Read(buf, binary.LittleEndian, &msgNo)
		fmt.Println(zero, msgLen, msgNo)
		var msgBody int8
		binary.Read(buf, binary.LittleEndian, &msgBody)
		fmt.Println(msgBody, buffer[12:n], string(buffer[12:n]))
		// binary.Read(buf, binary.LittleEndian, &x)
		// fmt.Println(x)
		// binary.Read(buf, binary.LittleEndian, &x)
		// fmt.Println(x)
		// binary.Read(buf, binary.LittleEndian, &x)
		// fmt.Println(x)
		conn.Write(buffer[:n])

	}

}

func Log(v ...interface{}) {
	log.Println(v...)
}

func CheckError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}
