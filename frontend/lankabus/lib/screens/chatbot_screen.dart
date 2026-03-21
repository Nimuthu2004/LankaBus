import 'package:flutter/material.dart';

class ChatbotScreen extends StatelessWidget {
  const ChatbotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("AI Assistant"),
        backgroundColor: const Color(0xFF1E3C72),
      ),
      body: Column(
        children: [

            Expanded(
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: const [

                Align(
                  alignment: Alignment.centerLeft,
                  child: ChatBubble(
                    text: "Hello 👋 How can I help you?",
                    isBot: true,
                  ),
                ),

                Align(
                  alignment: Alignment.centerRight,
                  child: ChatBubble(
                    text: "How to buy bus ticket?",
                    isBot: false,
                  ),
                ),

                Align(
                  alignment: Alignment.centerLeft,
                  child: ChatBubble(
                    text: "Go to Bus Tickets menu and select route.",
                    isBot: true,
                  ),
                ),
              ],
            ),
          ),

           /// Message Box
          Container(
            padding: const EdgeInsets.all(10),
            child: Row(
              children: [

                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: "Ask something...",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                  ),
                ),

                const SizedBox(width: 10),

                CircleAvatar(
                  backgroundColor: const Color(0xFF1E3C72),
                  child: IconButton(
                    icon: const Icon(Icons.send, color: Colors.white),
                    onPressed: () {},
                  ),
                )

              ],
            ),
          )

        ],
      ),
    );
  }
}

class ChatBubble extends StatelessWidget {
  final String text;
  final bool isBot;

  const ChatBubble({super.key, required this.text, required this.isBot});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isBot ? Colors.grey.shade300 : const Color(0xFF1E3C72),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: isBot ? Colors.black : Colors.white,
        ),
      ),
    );
  }
}