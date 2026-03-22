import 'package:flutter/material.dart';

class SummaryScreen extends StatelessWidget {
  const SummaryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Summary"),
        backgroundColor: Colors.blueGrey[900],
      ),
      body: const Center(
        child: Text(
          "This is the Summary screen",
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}