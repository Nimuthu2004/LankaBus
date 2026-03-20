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
  /// ROUTE DROPDOWN
  String? selectedRoute;

  final List<String> routes = [
    "Colombo - Negombo",
    "Colombo - Kandy",
    "Colombo - Galle",
    "Negombo - Kurunegala",
    "Colombo - Anuradhapura"
  ];
    /// IMAGE PICKER
  File? driverImage;
  final ImagePicker picker = ImagePicker();

  Future<void> pickImage() async {
    final picked = await picker.pickImage(source: ImageSource.gallery);

    if (picked != null) {
      setState(() {
        driverImage = File(picked.path);
      });
    }
  }
   @override
  void dispose() {
    busRegController.dispose();
    companyController.dispose();
    ntcController.dispose();
    conductorNameController.dispose();
    driverNameController.dispose();
    mobileController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }