import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../widgets/custom_button.dart';
class ConductorRegisterScreen extends StatefulWidget {
  const ConductorRegisterScreen({super.key});

  @override
  State<ConductorRegisterScreen> createState() =>
      _ConductorRegisterScreenState();
}
class _ConductorRegisterScreenState extends State<ConductorRegisterScreen> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController busRegController = TextEditingController();
  final TextEditingController companyController = TextEditingController();
  final TextEditingController ntcController = TextEditingController();
  final TextEditingController conductorNameController = TextEditingController();
  final TextEditingController driverNameController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  bool agreeTerms = false;
  bool obscurePassword = true;
  bool obscureConfirmPassword = true;