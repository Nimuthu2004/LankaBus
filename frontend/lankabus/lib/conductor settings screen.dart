import 'package:flutter/material.dart';

class ConductorSettingsScreen extends StatefulWidget {
  const ConductorSettingsScreen({super.key});

  @override
  State<ConductorSettingsScreen> createState() => _ConductorSettingsScreenState();
}

class _ConductorSettingsScreenState extends State<ConductorSettingsScreen> {

  bool darkMode = false;
  bool notifications = true;