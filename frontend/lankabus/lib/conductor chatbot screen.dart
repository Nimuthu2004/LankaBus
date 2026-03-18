import 'package:flutter/material.dart';

class ConductorChatbotScreen extends StatefulWidget {
  const ConductorChatbotScreen({super.key});

  @override
  State<ConductorChatbotScreen> createState() => _ConductorChatbotScreenState();
}

class _ConductorChatbotScreenState extends State<ConductorChatbotScreen> {

  final TextEditingController controller = TextEditingController();
  List<String> messages = [];