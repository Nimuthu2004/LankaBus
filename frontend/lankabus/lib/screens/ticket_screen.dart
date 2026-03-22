import 'package:flutter/material.dart';

class TicketScreen extends StatelessWidget {
  const TicketScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Ticket"),
        backgroundColor: const Color(0xFF1E3C72),
      ),
      body: const Center(
        child: Text(
          "This is Ticket Screen",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}