import 'package:flutter/material.dart';

class ConductorChatbotScreen extends StatefulWidget {
  const ConductorChatbotScreen({super.key});

  @override
  State<ConductorChatbotScreen> createState() => _ConductorChatbotScreenState();
}

class _ConductorChatbotScreenState extends State<ConductorChatbotScreen> {

  final TextEditingController controller = TextEditingController();
  List<String> messages = [];
  void sendMessage() {
    if (controller.text.isEmpty) return;

    setState(() {
      messages.add("You: ${controller.text}");
      messages.add("Bot: Ticket system assistant ready.");
    });

    controller.clear();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Conductor ChatBot"),
      ),
      body: Column(
        children: [

          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(messages[index]),
                );
              },
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(10),
            child: Row(
              children: [

                Expanded(
                  child: TextField(
                    controller: controller,
                    decoration: const InputDecoration(
                      hintText: "Ask something...",
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),

                const SizedBox(width: 10),

                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: sendMessage,
                )

              ],
            ),
          )

        ],
      ),
    );
  }
}