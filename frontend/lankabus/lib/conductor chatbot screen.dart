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