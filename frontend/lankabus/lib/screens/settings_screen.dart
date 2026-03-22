import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Settings"),
        backgroundColor: const Color(0xFF1E3C72),
      ),
      body: ListView(
        children: const [
          ListTile(leading: Icon(Icons.person), title: Text("Account")),

          ListTile(leading: Icon(Icons.language), title: Text("Language")),

          ListTile(
            leading: Icon(Icons.notifications),
            title: Text("Notifications"),
          ),

          ListTile(leading: Icon(Icons.help), title: Text("Help & Support")),

          ListTile(leading: Icon(Icons.logout), title: Text("Logout")),
        ],
      ),
    );
  }
}
