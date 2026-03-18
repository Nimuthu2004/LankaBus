import 'package:flutter/material.dart';

class ConductorSettingsScreen extends StatefulWidget {
  const ConductorSettingsScreen({super.key});

  @override
  State<ConductorSettingsScreen> createState() => _ConductorSettingsScreenState();
}

class _ConductorSettingsScreenState extends State<ConductorSettingsScreen> {

  bool darkMode = false;
  bool notifications = true;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Settings"),
      ),
      body: ListView(
        children: [

          SwitchListTile(
            title: const Text("Dark Mode"),
            value: darkMode,
            onChanged: (value) {
              setState(() {
                darkMode = value;
              });
            },
          ),

          SwitchListTile(
            title: const Text("Notifications"),
            value: notifications,
            onChanged: (value) {
              setState(() {
                notifications = value;
              });
            },
          ),
          ListTile(
            leading: const Icon(Icons.info),
            title: const Text("App Version"),
            subtitle: const Text("1.0.0"),
          ),

          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text("Logout"),
            onTap: () {
              Navigator.pop(context);
            },
          )

        ],
      ),
    );
  }
}