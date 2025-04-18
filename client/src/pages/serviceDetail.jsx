import React from "react";
import { useParams, Link } from "react-router-dom";

// Sample details for certificates
const serviceDetails = {
  1: {
    name: "Agricultural Land Value Application",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "Telangana agriculture land value certificate is a document that verifies the value of the land at a particular time. The government of Telangana fixes the unit rates of land or property in the state from time to time.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Application Form",
      "Encumbrance certificate as on date issued by the sub-Registrar concerned",
      "Pattadar Passbook",
      "Registration Documents",
      "Title Deed"
    ],
    optionalDocuments: [],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/agriculture_land_value_application.pdf",
  },
  2: {
    name: "Agriculture Income Certificate",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "This service helps citizens to get Agriculture Income Certificates, which are very useful for getting bank loans. Agriculture income is exempted under the Indian Income Tax Act. This certificate is issued by the Tahsildar. Registration required.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Application Form",
      "Ration Card/EPIC card/Aadhaar Card"
    ],
    optionalDocuments: [],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/agriculture_income_certificate.pdf",
  },
  3: {
    name: "Apathbandhu Scheme",
    fee: "₹45",
    timeline: "1 Year",
    description:
      "The Citizen can use this service to implement accident insurance for below-poverty-line families in Andhra Pradesh. It provides insurance coverage in case of accidental deaths. The insurance coverage is for adults in the age group.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Affidavit on Rs. 10/- Bond Paper",
      "Application Form",
      "Death Certificate",
      "FIR"
    ],
    optionalDocuments: [
      "Annexure - III",
      "Check Slip",
      "Dependent Certificate",
      "Income Certificate",
      "NOC issued by the APM-IKP of concerned Mandal",
      "Report of Postmortem / Panchanama",
      "White Ration Card"
    ],
    officerFlow: ["MRO", "RDO", "JC", "SO", "COL"],
    applicationForm: "/downloads/apathbandhu_application.pdf",
  },
  4: {
    name: "Appeals on Demarcation",
    fee: "₹45",
    timeline: "45 Working Days",
    description:
      "This form helps citizens to appeal for a demarcation of their land whenever they have doubts about demarcation that is already done by the surveyor.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Affidavit / Notary",
      "Application Form",
      "Panchanama copy of lower cadre",
      "Sketch"
    ],
    applicationForm: "/downloads/appeals_demarcation_application.pdf",
  },
  5: {
    name: "CC OF ROM HYD",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "Certified Copies of ROM (HYD) request is applied by the citizen through the MeeSeva centers. These requests can be accessed by the Deputy Director for further processing.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: ["Application Form"],
    officerFlow: ["Deputy Director Land Surveyor"],
    applicationForm: "/downloads/cc_of_rom_hyd_application.pdf",
  },
  6: {
    name: "CERTIFIED COPIES OF TSLR",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "A certified copy is a copy of a primary document that has on it an endorsement or certificate that it is a true copy of the primary document. TSLR means Town Survey Land Record.",
    serviceDelivery: [
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      GovtCentersFranchisee: "Cash"
    },
    documents: ["Application Form"],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/certified_copies_tslr_application.pdf",
  },
  7: {
    name: "CHANGE OF NAME APPLICATION",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "A name change request can come about simply because a person doesn’t like his or her name as given at birth. Perhaps they’d prefer something more unique than Britney or Ashley or something less unique than a homespun name that combined parents’ names.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Affidavit stating exact reason for change of his/her name",
      "Application Form",
      "Citizenship Certificate issued by Gazetted Officer",
      "Police Certificate stating no adverse records during last 5 years",
      "Recent Passport Size Photograph"
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/change_of_name_application.pdf",
  },
  8: {
    name: "COMMUNITY AND DATE OF BIRTH CERTIFICATE",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "MeeSeva introduces Community Date of Birth Certificate service to the citizen, which is under the Revenue Department. The main objective of this service is to issue Community Date of Birth Certificates to citizens who are under SC, ST, and BC castes. This certificate is useful for students for educational purposes, as proof of age (date of birth), and community verification. It is also useful for employment purposes for job holders. The issuing authority will be routed to Tahsildar (MRO), and for some castes, the request will be routed to RDO or District Collector.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "1 to 10th study Certificates or DOB Certificate issued by Municipality/Gram Panchayat",
      "Application Form",
      "Ration Card / Aadhaar Card / EPIC Card"
    ],
    officerFlow: ["MRO", "MRI", "DYMRO", "MRO/RDO"],
    applicationForm: "/downloads/community_dob_certificate.pdf",
  },
  9: {
    name: "EBC CERTIFICATE",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "Economically Backward Classes (EBC) is a subgroup of people with an annual household income of less than Rs. 8 lakh per year. However, this group of people does not belong to Scheduled Castes (SC), Scheduled Tribes (ST), or Other Backward Classes (OBC).",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet",
    },
    documents: ["Application Form"],
    officerFlow: ["COLLECTOR"],
    applicationForm: "/downloads/economically_backward_classes.pdf",
  },
  10: {
    name: "COMMUNITY AND DATE OF BIRTH CERTIFICATE",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "MeeSeva introduces Community Date of Birth Certificate service to the citizen, which is under the Revenue Department. The main objective of this service is to issue Community Date of Birth Certificates to citizens who are under SC, ST, and BC castes. This certificate is useful for students for educational purposes, as proof of age (date of birth), and community verification. It is also useful for employment purposes for job holders. The issuing authority will be routed to Tahsildar (MRO), and for some castes, the request will be routed to RDO or District Collector.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "1 to 10th study Certificates or DOB Certificate issued by Municipality/Gram Panchayat",
      "Application Form",
      "Ration Card / Aadhaar Card / EPIC Card",
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/community_birth_certificate.pdf",
  },
  11: {
    name: "EBC CERTIFICATE",
    fee: "₹45",
    timeline: "7 Working Days",
    description: "Economically Backward Classes (EBC) is a subgroup of people with an annual household income of less than Rs. 8 lakh per year. However, this group of people does not belong to Scheduled Castes (SC), Scheduled Tribes (ST), or Other Backward Classes (OBC).",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      "Franchisee": "24 Hours",
      "GovtCenters": "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      "Online": "Net Banking/CC/DC/Paytm/T-Wallet",
      "FranchiseeGovtCenters": "Cash/T-Wallet",
      "GovtCenters": "Cash/T-Wallet"
    },
    documents: ["Application Form"],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/economically_backward_classes.pdf"
  },
  12: {
    name: "ECONOMICALLY WEAKER SECTIONS",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "The economically weaker section (EWS) is the section of society in India that belongs to the unreserved category and has an annual family income below a certain threshold. This category includes people who do not belong to the caste categories of ST/SC/OBC, who already enjoy the benefits of reservation.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Applicant Signature",
      "Application Form",
      "Ration Card / Aadhar Card / EPIC Card",
      "Recent Passport Size Photograph",
      "Signature of the Parent / Guardian"
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/economically_weaker_sections.pdf"
  },
  13: {
    name: "EXTRACT OF HOUSE SITE PATTA EXTRACT OF DFORM PATTA",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "D-Form Patta: Landless poor persons of the village will be given Government wasteland for Agricultural Purpose. The service facilitates citizens for applying extract copies of House Site/D-Form Patta in lost or mutilated case.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers"
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM"
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet"
    },
    documents: [
      "Application Form"
    ], officerFlow: ["DYMRO"],
    applicationForm: "/downloads/extract_house_site_patta.pdf"
  },
  14: {
    name: "EXTRACT OF NOC UNDER EXPLOSIVE PETROLEUM ACT",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "Act. Extract of NOC under Petroleum Act: No Objection Certificate will be issued to the citizen in the manufacturing of any petroleum goods under the Petroleum Act. Under MeeSeva, the service facilitates the citizen in getting the copy of NOC under the Petroleum Act.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
      GovtCenters: "Cash/T-Wallet",
    },
    documents: ["Application Form"],
    officerFlow: ["COLLECTOR"],
    applicationForm: "/downloads/extract_noc_petroleum_act.pdf",
  },
  15: {
    name: "EXTRACT OF ORC",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "EXTRACT OF ORC The purpose of land reform and thus the tenancy reform is to fold the right. On one hand, it aims to make more rational use of the scarce land resources by affecting conditions of holdings, imposing ceilings and floors on holdings so that cultivation can be done in the most economical manner, i.e., without any waste of labour and capital. On the other hand, it is a means of redistributing agricultural land in the favors of less privileged classes, and of improving the terms and conditions on which the land is held for cultivation by the actual tillers, with a view to end exploitation. Extract of ORC will be issued on the request of the applicant and on availability of records in the office.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      FranchiseeGovtCenters: "Cash",
    },
    documents: ["Application Form"],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/extract_of_orc.pdf",
  },
  16: {
    name: "FAMILY MEMBERSHIP CERTIFICATE",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "A family membership certificate is a document provided by the government to the family members testifying household member status for varied legal purposes. This certificate can be obtained online by uploading the supporting documents. The validity of the Family membership certificate is limited and has to be renewed or regenerated after its expiry. Here's all you need to know about Family member certificate, also known as Surviving member certificate in some states.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "Application Form",
      "Death Certificate/FIR",
      "Ration card / EPIC Card / AADHAR Card",
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/family_membership_certificate.pdf",
  },
  17: {
    name: "FLINE PETITIONS SUB DIVISION",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "F-Line Application Service was mainly used for measuring boundaries of field by Surveyor. Sub Division Service was mainly used for sub-division of his/her land by Mandal surveyor.",
    serviceDelivery: {
      channels: [
        "Citizen Online Portal",
        "TAPP",
        "Franchisee Centres",
        "Govt Centers",
      ],
    },
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePaymentModes: {
      Online: ["Net Banking", "CC", "DC", "Paytm", "T-Wallet"],
      FranchiseeGovtCenters: ["Cash", "T-Wallet"],
    },
    documents: [
      "Application Form",
      "Copy of Pattadar Passbook",
      "Latest Pahani copy (or) 1-B Copy",
    ],
    officerFlow: ["MRO"],
  }, 18: {
    name: "GAP CERTIFICATE",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "A GAP Certificate is issued to validate a break or gap in education or employment history. It is required for various official and academic purposes.",
    serviceDelivery: {
      channels: ["Franchisee Centres", "Govt Centers"],
    },
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePaymentModes: {
      FranchiseeGovtCenters: ["Cash", "T-Wallet"],
    },
    documents: [
      "Application Form",
      "Affidavit on Stamp Paper",
      "Previous Educational Certificates",
      "Identity Proof (Aadhar Card/PAN Card)",
    ],
  },
  19: {
    name: "Income Certificate",
    fee: "₹45",
    timeline: "6 Working Days",
    description:
      "Income Certificate establishes the annual income of the applicant’s family for all legal and official purposes. It determines the economic status of the applicant, making them eligible for various government welfare schemes and programs.",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking, CC/DC, Paytm, T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: [
      "Application Form",
      "Passport Size Photo",
      "Ration Card / EPIC Card / AADHAR Card",
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/income_application.pdf",
  }, 20: {
    name: "Issue of Arm Licence",
    fee: "₹45",
    timeline: "45 Working Days",
    description: "An arm license (also known as a gun license) is a license or permit issued by the government. This service is provided through Meeseva and facilitates both fresh and renewal of the license.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers: Cash | Franchisee: Cash",
    documents: [
      "Address Proof",
      "Application Form",
      "Income Tax Returns",
      "Pan Card",
      "Recent Passport Size Photograph"
    ],
    officerFlow: ["Collector"],
    applicationForm: "/downloads/arm_license_application.pdf",
  },
  21: {
    name: "Issue of Caste Certificate to Brahmin Community",
    fee: "₹45",
    timeline: "30 Working Days",
    description: "Application for Issue of caste certificate to Brahmin community",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online: 24 Hours | Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking, CC/DC, Paytm, T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: [
      "1 to 10th study Certificates or DOB Certificate Issued by Municipality/Gram Panchayath",
      "Application Form",
      "Ration card / EPIC Card / AADHAR Card"
    ],
    officerFlow: ["MRO", "MRI", "DYMRO", "MRO"],
    applicationForm: "/downloads/caste_certificate_application.pdf"
  },
  22: {
    name: "Issue of NOC for Storing of Petroleum Products",
    fee: "₹45",
    timeline: "45 Working Days",
    description: "The main scope of the service is to issue a No Objection Certificate for storing petroleum products to the citizen.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash",
    documents: [
      "Application Form",
      "Copy of Passbook/title deed/sale deed",
      "Extract of Pahani",
      "Lease Agreement",
      "Letter of intent issued by the oil company",
      "Site Plan"
    ],
    officerFlow: ["Collector"],
    applicationForm: "/downloads/noc_petroleum_application.pdf",
  },
  23: {
    name: "Issue of Occupancy Rights Certificate for Inam Lands",
    fee: "₹45",
    timeline: "90 Working Days",
    description: "An Inam is a gift of land or land revenue. The origin of the Inam can be traced back to the times of Hindu and Mohammedan periods of rule. Parcels of land were granted by the Hindu and Mohammedan rulers to persons for services rendered by such persons or the services to be rendered in the future. This service facilitates the issue of Occupancy Rights Certificate.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash",
    documents: [
      "1954-1955 Kasara Pahani",
      "73-74 Latest Pahani Copies",
      "Application Form"
    ],
    officerFlow: ["RDO"],
    applicationForm: "/downloads/occupancy_rights_application.pdf",
  },
  24: {
    name: "Issue of Small and Marginal Farmer Certificate",
    fee: "₹45",
    timeline: "7 Working Days",
    description: "'Marginal Farmer' means a farmer cultivating (as owner, tenant, or sharecropper) agricultural land up to 1 hectare (2.5 acres). 'Small Farmer' means a farmer cultivating agricultural land of more than 1 hectare and up to 2 hectares (5 acres).",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online & Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking/CC/DC/Paytm/T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: [
      "Scanned Copy of Pattadar Passbook/Title Deed/1B Extract/Registered Sale Deeds of the Lands",
      "Application Form",
      "Self Declaration by the Farmer for the Lands Owned by Him/Her"
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/small_marginal_farmer_application.pdf",
  }, 25: {
    name: "Issue of Tonch Map",
    fee: "₹45",
    timeline: "7 Working Days",
    description: "Tonch Map is one of the proof documents to identify the land boundaries of a particular survey number. The final output of this service is the Tonch Map Certificate.",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online & Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking/CC/DC/Paytm/T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: [
      "Application Form",
      "Extract of Pahani / Xerox Copy of Pattadar Pass Book / Registration Document"
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/tonch_map_application.pdf",
  },
  26: {
    name: "Late Registration of Birth/Death",
    fee: "₹45",
    timeline: "60 Working Days",
    description: "Late Registration of Birth/Death Certificate is issued by the RDO if the registration is not done within one year of birth/death. The application is made to the Registrar of Births and Deaths along with the application form and fee, which may be forwarded to the Revenue Divisional Officer (RDO) for processing. The Registrar registers the birth/death on RDO's order and issues the certificate.",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online & Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking/CC/DC/Paytm/T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: [
      "Non-availability certificate issued by the GP or Municipal Commissioner",
      "Physical Document",
      "Ration Card Copy / ID PROOF / ADDRESS PROOF",
      "Self Affidavit"
    ],
    officerFlow: ["RDO", "MRO", "RDO"],
    applicationForm: "/downloads/birth_death_application.pdf",
  },
  27: {
    name: "Local Candidate Certificate for Educational Institutional Purpose",
    fee: "₹45",
    description: "The Local Candidate Certificate is issued to students for educational institutional purposes, certifying their local status for admission or other academic benefits.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Online & Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Franchisee & Govt Centers: Cash/T-Wallet",
  },
  28: {
    name: "Localization of Properties HYD",
    fee: "₹45",
    timeline: "30 Working Days",
    description: "A service requested by citizens to locate and identify the measurements of their property. The citizen provides survey numbers for localization, and the Mandal Surveyor provides details after the survey.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash",
    officerFlow: ["MRO"],
    documents: [
      "Affidavit/Notary stating that the applicant is the owner of the land",
      "Application Form"
    ],
    applicationForm: "/forms/localization_application.pdf"
  },
  29: {
    name: "Minority Certificate",
    fee: "₹35",
    timeline: "365 Days",
    description: "The objective of this service is to distribute the application for Awas Yojana 2BHK house.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash / Cheque / DD / Card Payments / T-Wallet",
  },
  30: {
    name: "Money Lending",
    fee: "₹45",
    timeline: "15 Working Days",
    description: "Lending is the act of giving money to someone now with the expectation they will pay you back in the future. Usually, lenders are reimbursed by ongoing, monthly payments made by the borrower until the total amount owed is received.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash",
    officerFlow: ["Collector"],
    documents: [
      "Address Proof",
      "Affidavit",
      "Application Form",
      "Bank A/C statement above 6 months with a min balance of 100000/-",
      "Copy of Attested Property Documents",
      "National Saving Certificate for 10000/- in the name of Applicant/Firm",
      "PAN",
      "Scanned Copy of Passport size photo (JPEG files only)"
    ],
    applicationForm: "/forms/money_lending_application.pdf",
  },

  32: {
    name: "NFBS Application",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "Implemented by the Ministry of Rural Development for families living below the poverty line.",
    serviceDelivery: "Franchisee Centres, Govt Centers",
    serviceTimings: "Franchisee: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Govt Centers & Franchisee: Cash",
    documents: [
      "Application Form",
      "Death Certificate",
      "Family Member Certificate",
      "Income Certificate (Less than Rs. 6000 per Month)",
      "Resident Certificate (3-year residency required)",
      "White Ration Card",
    ],
    officerFlow: ["MRO", "RDO", "JC/COL", "SC"],
  },
  33: {
    name: "No Earning Member Certificate",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "No Earning Member Certificate allows the citizen to receive benefits from the Government due to the uncertain death of the earning member in a family.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Online: "24 Hours",
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "Application Form",
      "Death Certificate",
      "Ration card / EPIC Card / AADHAR Card",
    ],
    officerFlow: ["MRO"],
  },
  34: {
    name: "No Objection Certificate",
    fee: "₹45",
    timeline: "45 Working Days",
    description:
      "No Objection Certificate (NOC) is a legal document issued by an organisation, institute, or an individual to say that they have no objection to the mentioned details in the document. It can be used for employment, trade, litigation, immigration, and many other purposes to nullify any party’s objection.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Online: "24 Hours",
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "Self addressed envelope with stamp for postage",
      "Affidavit on Ten Rupees stamp paper (Notarized)",
      "Application Form",
      "Link Documents from 1976 (Attested)",
      "Sale Deed / Release / Will Gift / Settlement / Partition",
      "Site Sketch plan prepared by licensed surveyor",
    ],
    officerFlow: ["Joint Collector"],
  },
  35: {
    name: "No Property Application Service",
    fee: "₹45",
    timeline: "60 Working Days",
    description:
      "The No Property Certificate is issued to the citizen where there is no breadwinner in the family and the family cannot afford to get a job. No Property Certificate will be issued on the request of the applicant and on the availability of records in the office.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      Online: "24 Hours",
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "Application Form",
      "Copy of Family Member Certificate",
      "Death Certificate",
      "Ration Card / Aadhaar No / Electoral Card",
    ],
    officerFlow: ["MRO"],
  },
  36: {
    name: "NOC for Construction of Cinema Hall",
    fee: "₹45",
    timeline: "45 Working Days",
    description:
      "This application form can be used by a citizen to get a No Objection Certificate issued for the construction of a Cinema Hall. Application form for construction of cinema hall is provided below.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      GovtCenters: "Cash",
      Franchisee: "Cash",
    },
    documents: [
      "Ammonia Plan (Blue Print)",
      "Application Form",
      "Original NOC from Gram Panchayath",
      "Original Plan",
      "Original Challan",
    ],
    officerFlow: ["Joint Collector"],
  },
  37: {
    name: "OBC Certificate",
    fee: "₹45",
    timeline: "30 Working Days",
    description: "OBC certificate is issued by the central government to people for the purpose of reservation in education and jobs.",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking, CC/DC, Paytm, T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: ["Application Form"],
    optionalDocuments: [
      "Applicant Father/Mother Employment particulars / Income Tax returns (for professionals)",
      "Applicant Father/Mother’s property particulars",
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/obc_application.pdf",

  },
  38: {
    name: "Orphanage Integrated Certificate Application",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "Orphanage Integrated Certificate Application Form. This application form can be used by citizens when an orphan or destitute, as a ward of the state, is being admitted to an orphanage which provides them with care, housing, and education.",
    serviceDelivery: [
      "Citizen Online Portal",
      "TAPP",
      "Franchisee Centres",
      "Govt Centers",
    ],
    serviceTimings: {
      OnlineFranchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking / CC / DC / Paytm / T-Wallet",
      FranchiseeGovtCenters: "Cash / T-Wallet",
    },
    documents: [
      "Institution Certificate (Form-VIII A)",
      "Meeseva Application",
      "Passport Size Photo (Photo in JPG format only)",
    ],
    officerFlow: ["MRO", "MRI", "DYMRO", "MRO/RDO"],
  },
  39: {
    name: "Pawn Broker",
    fee: "₹45",
    timeline: "45 Working Days",
    description:
      "A pawnbroker is an individual or business (pawnshop or pawn shop) that offers secured loans to people, with items of personal property used as collateral.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      GovtCentersFranchisee: "Cash",
    },
    documents: [
      "Address Proof",
      "Affidavit",
      "Application Form",
      "Bank A/C statement above 6 months with a min balance of 100000/-",
      "Copy of Attested Property Documents",
      "National Saving Certificate for 10000/- in the name of Applicant/Firm",
      "PAN",
      "Scanned Copy of Passport size photo (Please Upload only JPEG files)",
    ],
    officerFlow: ["Joint Collector"],
  },
  40: {
    name: "Permission for Digging an Agricultural Well Drinking Water Well",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "This service is used for getting Permission for Digging an Agricultural well/Drinking water well digging using WALTA Act.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      GovtCentersFranchisee: "Cash",
    },
    documents: [
      "Application in prescribed format",
      "Photocopy of Pattadar Passbook/Title Deed/1B Extract/Registered sale deeds of the Lands",
      "Small and Marginal Farmer Certificate for Fee concession",
    ],
    officerFlow: ["MRO"],
  },
  41: {
    name: "Permission to Run the Benefit Show",
    fee: "₹45",
    timeline: "7 Working Days",
    description:
      "Permission to Run the Benefit show request is applied by the citizen through the Meeseva centers. This request can be accessed by the Department and processed.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      GovtCentersFranchisee: "Cash",
    },
    documents: [
      "Application Form",
      "Copy of B - Form Licence Certificate",
    ],
    officerFlow: ["Joint Collector"],
  }, 42: {
    name: "Possession Certificate",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "A possession certificate or a 'possession letter' is provided by a property’s seller to its buyer as proof of possession transfer.",
    serviceDelivery: ["Citizen Online Portal", "TAPP", "Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Online: "24 Hours",
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      Online: "Net Banking/CC/DC/Paytm/T-Wallet",
      FranchiseeGovtCenters: "Cash/T-Wallet",
    },
    documents: [
      "Application Form",
      "Income Certificate/Ration Card",
    ],
    optionalDocuments: [
      "Applicant Photo (In .JPG Format Only)"
    ],
    officerFlow: ["MRO"],
  },
  43: {
    name: "Refund of Trade Deposit",
    fee: "₹45",
    timeline: "30 Working Days",
    description:
      "Refund of Trade Deposit request is applied by the citizen through the Meeseva centers. This request can be accessed by the RDO and processed.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: ["Cash"],
    documents: ["Acceptance proceedings issued by the RDO", "Application Form"],
    optionalDocuments: ["Authorisation proceedings issued by the RDO"],
    officerFlow: ["RDO"],
  },
  44: {
    name: "Renewal of Cinema Licence",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "Under the Cinematography Act, the applicant must seek a permit before constructing a cinema hall. Licensing authority is the Joint Collector. The Cinematography Act of 1955 regulates the conditions of theatres for sanitation, seating, black marketing of tickets, and prohibition of obscene film publishing. Through Meeseva, citizens can apply for the Renewal of Cinema License.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: ["Franchisee: 24 Hours", "Govt Centres: 9:00 AM to 7:00 PM"],
    servicePayment: ["Govt Centers: Cash", "Franchisee: Cash"],
    documents: ["Application Form", "Copy of B - Form Licence Certificate"],
    optionalDocuments: [
      "Certificate issued by Dy. Electrical Inspector",
      "Certificate issued by DMHO",
      "Certificate issued by Divisional Fire Officer",
      "Film Division Certificate",
      "Structural Soundness Certificate issued by the EE R&D",
    ],
    officerFlow: ["RDO"],
    applicationForm: "/downloads/cinema_renewal.pdf",
  },
  45: {
    name: "Residence Certificate",
    fee: "₹45",
    timeline: "6 Working Days",
    description:
      "A Residence Certificate is proof to ensure that the person bearing the Certificate is a Resident of the State. It is required for availing Residence/Resident Quotas in educational institutions, Government services, and jobs where local residents are preferred.",
    serviceDelivery: "Citizen Online Portal, TAPP, Franchisee Centres, Govt Centers",
    serviceTimings: "Online: 24 Hours | Govt Centres: 9:00 AM to 7:00 PM",
    servicePayment: "Online: Net Banking, CC/DC, Paytm, T-Wallet | Franchisee & Govt Centers: Cash/T-Wallet",
    documents: ["Application Form", "Passport Size Photo (jpg only)"],
    optionalDocuments: [
      "House Tax / Telephone Bill / Electricity Bill",
      "Ration Card / EPIC Card / AADHAR Card",
    ],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/residence_application.pdf",
  },
  46: {
    name: "Village Map Copy",
    fee: "₹45",
    timeline: "15 Working Days",
    description:
      "The village map is a timely response to the citizen's request for information. The validity of the information counts rather than the document. The village map stands valid till any land acquisition happens from the government side.",
    serviceDelivery: ["Franchisee Centres", "Govt Centers"],
    serviceTimings: {
      Franchisee: "24 Hours",
      GovtCenters: "9:00 AM to 7:00 PM",
    },
    servicePayment: {
      GovtCenters: "Cash",
      Franchisee: "Cash",
    },
    documents: ["Application Form"],
    optionalDocuments: [],
    officerFlow: ["MRO"],
    applicationForm: "/downloads/village_map_copy.pdf",
  }
};

const ServiceDetail = () => {
    const { sno } = useParams();
    const service = serviceDetails[sno];
  
    if (!service) {
      return <h2 className="text-center mt-5">Service Not Found</h2>;
    }
  
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{service.name}</h2>
  
        {/* Fee and Timeline */}
        <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
          <span className="font-medium">Fee: {service.fee}</span>
          <span className="font-medium">Timeline: {service.timeline}</span>
        </div>
  
        {/* Description */}
        {service.description && (
          <p className="mt-4">
            <span className="font-medium">Description:</span> {service.description}
          </p>
        )}
  
        {/* Mandatory Documents */}
        {service.documents && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">📄 Mandatory Documents</h4>
            <ul className="bg-white border rounded-lg divide-y">
              {service.documents.map((doc, index) => (
                <li className="px-4 py-3" key={index}>⭐ {doc}</li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Optional Documents */}
        {service.optionalDocuments && service.optionalDocuments.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">📝 Optional Documents</h4>
            <ul className="bg-white border rounded-lg divide-y">
              {service.optionalDocuments.map((doc, index) => (
                <li className="px-4 py-3" key={index}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Officer Flow */}
        {service.officerFlow && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">📌 Officer Flow</h4>
            <div className="flex flex-col items-center">
              {service.officerFlow.map((officer, index) => (
                <div key={index} className="text-center border rounded p-2 my-1 w-1/3 bg-gray-50">
                  {officer}
                  {index < service.officerFlow.length - 1 && (
                    <div className="text-gray-400 text-2xl mt-1">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Service Delivery */}
        {service.serviceDelivery && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">🏢 Service Delivery</h4>
            <div className="bg-white border rounded-lg p-4">
              {Array.isArray(service.serviceDelivery) ? (
                <ul className="list-disc pl-5">
                  {service.serviceDelivery.map((channel, index) => (
                    <li key={index}>{channel}</li>
                  ))}
                </ul>
              ) : (
                <p>{service.serviceDelivery}</p>
              )}
            </div>
          </div>
        )}
  
        {/* Application Form Button & Back Button */}
        <div className="flex justify-center mt-8 space-x-4">
          <Link 
            to={`/application-form/${sno}`} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Open Application Form
          </Link>
          <Link 
            to="/" 
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </Link>
        </div>
      </div>
    );
  };
  
  export default ServiceDetail;