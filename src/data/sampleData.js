import { Input } from "postcss";

export const sampleAPIs = [
  // REST APIs
  {
    id: 'rest-001',
    name: 'notificaFirmaModulo',
    type: 'REST_API',
    category: 'authentication',
    status: 'active',
    description: 'a new method in order to have a notification back from FEA to receive the result of signature of the document that has been generated to be digitally signed',
    tags: ['notification', 'signature', 'document', 'FEA'],
    owner: 'ITCREDITI-INDIA',
    department: 'ITCREDITI',
    lastUpdated: '2024-10-25T10:30:00Z',
    createdAt: '2023-05-15T08:00:00Z',
    version: 'v1.0.0',
    documentation: {
      url: 'https://api-docs.company.com/user-mgmt',
      hasInteractiveDocs: false,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 15000,
      uniqueUsers: 250,
    },
    technical: {
      baseUrl: 'http://soa.bansel.it/osb/GestioneAmministrativaGaranzie',
      endpoint: '/notificaFirmaModulo',
      method: 'POST',
      authMethod: 'OAuth 2.0 Bearer Token',
      contentType: 'application/json',
      rateLimit: '1000 requests/hour per user',
      responseTime: 95,
      slaUptime: 99.9,
    },
    contact: {
      email: 'itcrediti-support@company.com',
      team: 'ITCREDITI',
      slackChannel: '#itcrediti-api',
    },
    sampleRequest: {
      DM_ID: 'DOC_12345'
    },
    sampleResponse: {
      status: 'OK',
      message: 'Document signature notification received successfully'
    }
  },
  {
    id: 'rest-002',
    name: 'Payment Processing API',
    type: 'REST_API',
    category: 'payment',
    status: 'active',
    version: 'v3.2.1',
    description: 'Secure payment processing with support for multiple payment methods, fraud detection, PCI compliance, and real-time transaction monitoring.',
    tags: ['payments', 'credit-card', 'fraud-detection', 'pci-compliant', 'webhooks'],
    owner: 'Sarah Johnson',
    department: 'Financial Services',
    lastUpdated: '2024-10-28T14:20:00Z',
    createdAt: '2023-03-10T09:15:00Z',
    documentation: {
      url: 'https://api-docs.company.com/payments',
      hasInteractiveDocs: true,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 85000,
      uniqueUsers: 1200,
    },
    technical: {
      baseUrl: 'https://api.company.com/payments/v3',
      endpoint: '/process',
      method: 'POST',
      authMethod: 'API Key + OAuth 2.0',
      contentType: 'application/json',
      rateLimit: '500 requests/hour per merchant',
      responseTime: 120,
      slaUptime: 99.95,
    },
    contact: {
      email: 'payments-team@company.com',
      team: 'Financial Services',
      slackChannel: '#payments-api',
    },
    sampleRequest: {
      merchantId: 'MERCH_98765',
      amount: 150.00,
      currency: 'USD',
      paymentMethod: 'credit_card',
      cardDetails: {
        cardNumber: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123'
      },
      customerEmail: 'customer@example.com'
    },
    sampleResponse: {
      transactionId: 'TXN_ABC123456',
      status: 'approved',
      amount: 150.00,
      currency: 'USD',
      timestamp: '2024-10-28T14:20:00Z',
      authCode: 'AUTH789'
    }
  },
  {
    id: 'rest-003',
    name: 'Analytics Dashboard API',
    type: 'REST_API',
    category: 'analytics',
    status: 'active',
    version: 'v1.8.0',
    description: 'Business intelligence API providing real-time metrics, custom reports, data visualization endpoints, and predictive analytics capabilities.',
    tags: ['analytics', 'metrics', 'reporting', 'dashboards', 'business-intelligence'],
    owner: 'Mike Chen',
    department: 'Data & Analytics',
    lastUpdated: '2024-10-20T16:45:00Z',
    createdAt: '2023-08-22T11:30:00Z',
    documentation: {
      url: 'https://api-docs.company.com/analytics',
      hasInteractiveDocs: true,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 65000,
      uniqueUsers: 800,
    },
    technical: {
      baseUrl: 'https://api.company.com/analytics/v1',
      endpoint: '/reports',
      method: 'POST',
      authMethod: 'OAuth 2.0 Bearer Token',
      contentType: 'application/json',
      rateLimit: '2000 requests/hour per user',
      responseTime: 200,
      slaUptime: 99.5,
    },
    contact: {
      email: 'analytics-team@company.com',
      team: 'Data & Analytics',
      slackChannel: '#analytics-api',
    },
    sampleRequest: {
      reportType: 'sales',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      metrics: ['revenue', 'conversions'],
      groupBy: 'month'
    },
    sampleResponse: {
      reportId: 'rpt_12345',
      reportType: 'sales',
      period: { start: '2024-01-01', end: '2024-12-31' },
      results: [
        { month: '2024-01', revenue: 125000.50, conversions: 450 },
        { month: '2024-02', revenue: 138500.75, conversions: 520 }
      ],
      totalRevenue: 1500000.00,
      totalConversions: 5800
    }
  },
  {
    id: 'rest-004',
    name: 'Notification Service API',
    type: 'REST_API',
    category: 'communication',
    status: 'active',
    version: 'v2.0.3',
    description: 'Multi-channel notification system supporting email, SMS, push notifications, webhooks, and in-app messaging with delivery tracking.',
    tags: ['notifications', 'email', 'sms', 'push', 'webhooks', 'messaging'],
    owner: 'Lisa Rodriguez',
    department: 'Platform Services',
    lastUpdated: '2024-10-22T09:15:00Z',
    createdAt: '2023-06-18T13:20:00Z',
    documentation: {
      url: 'https://api-docs.company.com/notifications',
      hasInteractiveDocs: true,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 180000,
      uniqueUsers: 3500,
    },
    technical: {
      baseUrl: 'https://api.company.com/notifications/v2',
      endpoint: '/send',
      method: 'POST',
      authMethod: 'API Key',
      contentType: 'application/json',
      rateLimit: '10000 requests/hour per service',
      responseTime: 80,
      slaUptime: 99.8,
    },
    contact: {
      email: 'platform-team@company.com',
      team: 'Platform Services',
      slackChannel: '#notifications-api',
    },
    sampleRequest: {
      channel: 'email',
      recipient: 'user@example.com',
      subject: 'Order Confirmation',
      message: 'Your order #12345 has been confirmed',
      priority: 'normal',
      metadata: {
        orderId: '12345',
        customerName: 'John Doe'
      }
    },
    sampleResponse: {
      notificationId: 'NOTIF_789ABC',
      status: 'sent',
      channel: 'email',
      recipient: 'user@example.com',
      sentAt: '2024-10-22T09:15:00Z',
      deliveryStatus: 'delivered'
    }
  },
  {
    id: 'rest-005',
    name: 'E-commerce API',
    type: 'REST_API',
    category: 'integration',
    status: 'beta',
    version: 'v1.0.0-beta.3',
    description: 'Complete e-commerce solution with product catalog, inventory management, order processing, and customer management capabilities.',
    tags: ['ecommerce', 'products', 'orders', 'inventory', 'catalog'],
    owner: 'David Park',
    department: 'E-commerce',
    lastUpdated: '2024-10-29T11:00:00Z',
    createdAt: '2024-07-01T10:00:00Z',
    documentation: {
      url: 'https://api-docs.company.com/ecommerce',
      hasInteractiveDocs: false,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 25000,
      uniqueUsers: 150,
    },
    technical: {
      baseUrl: 'https://api-beta.company.com/ecommerce/v1',
      endpoint: '/orders',
      method: 'POST',
      authMethod: 'OAuth 2.0 Bearer Token',
      contentType: 'application/json',
      rateLimit: '1000 requests/hour per store',
      responseTime: 180,
      slaUptime: 99.0,
    },
    contact: {
      email: 'ecommerce-team@company.com',
      team: 'E-commerce Platform',
      slackChannel: '#ecommerce-api',
    },
    sampleRequest: {
      customerId: 'CUST_567890',
      items: [
        { productId: 'PROD_123', quantity: 2, price: 49.99 },
        { productId: 'PROD_456', quantity: 1, price: 79.99 }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'credit_card'
    },
    sampleResponse: {
      orderId: 'ORD_789123',
      status: 'confirmed',
      totalAmount: 179.97,
      currency: 'USD',
      estimatedDelivery: '2024-11-05',
      trackingNumber: 'TRACK_ABC123'
    }
  },
  {
    id: 'rest-006',
    name: 'File Storage API',
    type: 'REST_API',
    category: 'storage',
    status: 'deprecated',
    version: 'v1.2.5',
    description: 'Legacy file storage and management system. Being replaced by Cloud Storage API v2.',
    tags: ['storage', 'files', 'legacy', 'deprecated'],
    owner: 'Tom Wilson',
    department: 'Infrastructure',
    lastUpdated: '2024-08-15T14:30:00Z',
    createdAt: '2022-11-20T09:00:00Z',
    documentation: {
      url: 'https://api-docs.company.com/storage-v1',
      hasInteractiveDocs: false,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 5000,
      uniqueUsers: 45,
    },
    technical: {
      baseUrl: 'https://api.company.com/storage/v1',
      endpoint: '/upload',
      method: 'POST',
      authMethod: 'API Key',
      contentType: 'multipart/form-data',
      rateLimit: '500 requests/hour per user',
      responseTime: 350,
      slaUptime: 98.0,
    },
    contact: {
      email: 'infrastructure@company.com',
      team: 'Infrastructure',
      slackChannel: '#infrastructure',
    },
    sampleRequest: {
      file: 'document.pdf',
      fileName: 'report_2024.pdf',
      folder: '/reports/annual',
      metadata: {
        category: 'financial',
        year: 2024
      }
    },
    sampleResponse: {
      fileId: 'FILE_XYZ789',
      fileName: 'report_2024.pdf',
      fileUrl: 'https://storage.company.com/files/FILE_XYZ789',
      size: 2048576,
      uploadedAt: '2024-08-15T14:30:00Z'
    }
  },
  {
    id: 'rest-007',
    name: 'Security Service API',
    type: 'REST_API',
    category: 'security',
    status: 'active',
    version: 'v2.3.1',
    description: 'Core security services including encryption, token validation, audit logging, and threat detection with real-time monitoring.',
    tags: ['security', 'encryption', 'tokens', 'audit', 'monitoring'],
    owner: 'Jennifer Lee',
    department: 'Security',
    lastUpdated: '2024-10-26T08:45:00Z',
    createdAt: '2023-01-15T07:30:00Z',
    documentation: {
      url: 'https://api-docs.company.com/security',
      hasInteractiveDocs: true,
    },
    dependencies: [],
    dependents: [],
    usage: {
      requestsPerDay: 250000,
      uniqueUsers: 4200,
    },
    technical: {
      baseUrl: 'https://api.company.com/security/v2',
      endpoint: '/validate-token',
      method: 'POST',
      authMethod: 'mTLS + API Key',
      contentType: 'application/json',
      rateLimit: '5000 requests/hour per service',
      responseTime: 50,
      slaUptime: 99.99,
    },
    contact: {
      email: 'security-team@company.com',
      team: 'Information Security',
      slackChannel: '#security-api',
    },
    sampleRequest: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      service: 'payment-api',
      requestedScopes: ['read', 'write']
    },
    sampleResponse: {
      valid: true,
      userId: 'USR_12345',
      scopes: ['read', 'write', 'admin'],
      expiresAt: '2024-10-26T20:45:00Z',
      tokenType: 'Bearer'
    }
  },

  // Java APIs
     {
      id: 'java-001',
      name: 'getListaOneriUsura',
      type: 'JAVA_API',
      category: 'utilities',
      status: 'active',
      version: 'v3.1.2',
      description: 'It would provide the details about list of wear and tear charges applied',
      tags: ['rules-engine', 'workflow', 'decisions', 'policies', 'automation'],
      owner: 'ITCREDITI-INDIA',
      department: 'CREDITI',
      lastUpdated: '2024-10-18T15:20:00Z',
      createdAt: '2023-02-28T12:00:00Z',
      documentation: {
        url: 'https://docs.company.com/java/business-rules',
        hasInteractiveDocs: false,
      },
      dependencies: ['java-002', 'oracle-001'],
      dependents: ['rest-002'],
      usage: {
        requestsPerDay: 95000,
        uniqueUsers: 280,
      },
      technical: {
        packageName: 'it.sella.gag.gestore',
        className: 'GestoreGaranzieImpl',
        method: 'getListaOneriUsura',
        interface: 'IGestoreGaranzie',
        apiSignature: 'IGestoreGaranzie.getListaOneriUsura(numeroConto)',
        authMethod: 'Service Account',
        responseTime: 145,
        slaUptime: 99.7,
      },
      contact: {
        email: 'business-logic@company.com',
        team: 'Business Logic',
        slackChannel: '#business-rules',
      },
      sampleRequest: {
        numeroConto: 'F6E9604262501',      
      },
      sampleResponse: {
        success: true,
        data: 'List of Oneri Usura',     
      }
    },
  {
    id: 'java-002',
    name: 'Data Processing Engine',
    type: 'JAVA_API',
    category: 'analytics',
    status: 'active',
    version: 'v2.8.0',
    description: 'High-performance data processing framework for ETL operations, real-time streaming, batch processing, and data transformations.',
    tags: ['data-processing', 'etl', 'streaming', 'batch', 'transformations'],
    owner: 'Anna Petrov',
    department: 'Data Engineering',
    lastUpdated: '2024-10-24T13:10:00Z',
    createdAt: '2023-04-05T10:45:00Z',
    documentation: {
      url: 'https://docs.company.com/java/data-processing',
      hasInteractiveDocs: false,
    },
    dependencies: ['oracle-001', 'oracle-002'],
    dependents: ['rest-003', 'java-001'],
    usage: {
      requestsPerDay: 155000,
      uniqueUsers: 420,
    },
    technical: {
      packageName: 'com.company.dataengineering.processing',
      className: 'DataProcessingEngine',
      method: 'processData',
      authMethod: 'Service Account',
      responseTime: 85,
      slaUptime: 99.5,
    },
    contact: {
      email: 'data-engineering@company.com',
      team: 'Data Engineering',
      slackChannel: '#data-processing',
    },
    sampleRequest: {
      jobType: 'ETL',
      sourceConfig: {
        type: 'database',
        connectionString: 'jdbc:oracle:thin:@db.company.com:1521:PROD'
      },
      transformations: ['normalize', 'aggregate', 'enrich'],
      targetConfig: {
        type: 'warehouse',
        table: 'DW_SALES_DATA'
      },
      schedule: 'daily'
    },
    sampleResponse: {
      jobId: 'JOB_987654',
      status: 'completed',
      recordsProcessed: 125000,
      executionTime: 850,
      startTime: '2024-10-24T13:00:00Z',
      endTime: '2024-10-24T13:14:10Z',
      summary: {
        extracted: 125000,
        transformed: 125000,
        loaded: 125000,
        errors: 0
      }
    }
  },
  {
    id: 'java-003',
    name: 'Cryptography Library',
    type: 'JAVA_API',
    category: 'security',
    status: 'active',
    version: 'v1.5.3',
    description: 'Enterprise-grade cryptographic functions including AES encryption, RSA key management, digital signatures, and secure hashing.',
    tags: ['cryptography', 'encryption', 'security', 'keys', 'signatures'],
    owner: 'Mark Thompson',
    department: 'Security',
    lastUpdated: '2024-10-27T12:30:00Z',
    createdAt: '2023-09-12T14:15:00Z',
    documentation: {
      url: 'https://docs.company.com/java/cryptography',
      hasInteractiveDocs: false,
    },
    dependencies: ['rest-007'],
    dependents: ['java-001', 'rest-001', 'rest-002'],
    usage: {
      requestsPerDay: 75000,
      uniqueUsers: 180,
    },
    technical: {
      packageName: 'com.company.security.crypto',
      className: 'CryptographyService',
      method: 'encrypt',
      authMethod: 'Service Account + Hardware Token',
      responseTime: 25,
      slaUptime: 99.95,
    },
    contact: {
      email: 'crypto-team@company.com',
      team: 'Cryptography',
      slackChannel: '#crypto-lib',
    },
    sampleRequest: {
      operation: 'encrypt',
      algorithm: 'AES-256-GCM',
      data: 'sensitive_data_to_encrypt',
      keyId: 'KEY_ABC123',
      options: {
        ivLength: 16,
        tagLength: 128
      }
    },
    sampleResponse: {
      success: true,
      encryptedData: 'U2FsdGVkX1+9z8Y3J...',
      iv: 'a1b2c3d4e5f6g7h8',
      tag: 'i9j0k1l2m3n4o5p6',
      algorithm: 'AES-256-GCM',
      keyId: 'KEY_ABC123',
      timestamp: '2024-10-27T12:30:00Z'
    }
  },
  {
    id: 'java-004',
    name: 'Message Queue Handler',
    type: 'JAVA_API',
    category: 'messaging',
    status: 'maintenance',
    version: 'v2.2.1',
    description: 'Reliable message queue processing with support for Apache Kafka, RabbitMQ, and custom protocols. Currently under maintenance for performance improvements.',
    tags: ['messaging', 'queue', 'kafka', 'rabbitmq', 'async'],
    owner: 'Carlos Martinez',
    department: 'Platform Services',
    lastUpdated: '2024-09-30T16:00:00Z',
    createdAt: '2023-07-08T11:20:00Z',
    documentation: {
      url: 'https://docs.company.com/java/message-queue',
      hasInteractiveDocs: false,
    },
    dependencies: ['java-002'],
    dependents: ['rest-003', 'rest-004'],
    usage: {
      requestsPerDay: 200000,
      uniqueUsers: 650,
    },
    technical: {
      packageName: 'com.company.platform.messaging',
      className: 'MessageQueueHandler',
      method: 'publishMessage',
      authMethod: 'Service Account',
      responseTime: 320,
      slaUptime: 98.5,
    },
    contact: {
      email: 'messaging-team@company.com',
      team: 'Platform Services',
      slackChannel: '#messaging',
    },
    sampleRequest: {
      queue: 'orders-queue',
      messageType: 'ORDER_CREATED',
      payload: {
        orderId: 'ORD_456789',
        customerId: 'CUST_123',
        amount: 299.99,
        items: 3
      },
      priority: 'normal',
      deliveryMode: 'persistent'
    },
    sampleResponse: {
      messageId: 'MSG_789456123',
      queue: 'orders-queue',
      status: 'published',
      timestamp: '2024-09-30T16:00:00Z',
      partitionId: 2,
      offset: 150234
    }
  },

  // Oracle APIs
  {
    id: 'oracle-001',
    name: 'WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK(IN_ID_BANCA IN NUMBER)',
    type: 'ORACLE_API',
    category: 'database',
    status: 'active',
    version: 'v1.0',
    description: 'Oracle function to retrieve ABI (Italian Banking Association) code for a given bank ID. Part of the CRC external interface package used for bank identification and validation.',
    tags: ['weblogic', 'banking', 'abi-code', 'lookup', 'external-interface'],
    owner: 'Patricia Wong',
    department: 'Database Administration',
    lastUpdated: '2024-11-04T10:00:00Z',
    createdAt: '2022-08-15T08:00:00Z',
    
    // Core Metadata
    owningProject: 'Banking Core System',
    businessFunction: 'Bank identification and validation for payment processing and account verification',
    consumerProjects: ['Payment Gateway', 'Account Management', 'Wire Transfer Service', 'KYC Validation'],
    technologyStack: 'Oracle PL/SQL, WebLogic Server',
    interfaceType: 'PL/SQL Function',
    
    // Endpoints
    endpointURL: 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD/WEBLOGIC_DBA',
    environments: {
      dev: 'jdbc:oracle:thin:@weblogic-dev.company.com:1521:DEV/WEBLOGIC_DBA',
      qa: 'jdbc:oracle:thin:@weblogic-qa.company.com:1521:QA/WEBLOGIC_DBA',
      uat: 'jdbc:oracle:thin:@weblogic-uat.company.com:1521:UAT/WEBLOGIC_DBA',
      prod: 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD/WEBLOGIC_DBA'
    },
    
    // Authentication
    authentication: {
      method: 'Oracle Wallet + Service Account',
      tokenEndpoint: 'N/A - Database authentication',
      accessControl: 'Schema-level privileges + IP Whitelist',
      onboardingSteps: '1. Request database access via ServiceNow. 2. Provide IP address for whitelisting. 3. Receive Oracle Wallet credentials. 4. Test connection in DEV environment.'
    },
    
    // Input Specifications
    inputSpecifications: {
      format: 'PL/SQL Parameters',
      mandatoryFields: ['IN_ID_BANCA'],
      optionalFields: [],
      validationRules: 'IN_ID_BANCA must be a valid NUMBER type, positive integer, existing in BANK_MASTER table'
    },
    
    // Output Specifications
    outputSpecifications: {
      format: 'VARCHAR2',
      successResponse: 'Returns 5-digit ABI code (e.g., "03069")',
      errorResponse: 'NULL or raises ORA-01403 (no data found)',
      errorCodes: ['ORA-01403: No data found', 'ORA-01722: Invalid number', 'ORA-06502: Numeric or value error']
    },
    
    // Functional Behavior
    functionalBehavior: {
      summary: 'Queries BANK_MASTER table to retrieve the Italian Banking Association (ABI) code corresponding to the provided bank ID. Used for regulatory compliance and interbank communications.',
      dependencies: ['BANK_MASTER table', 'CRC_PKG_EXT_INTERFACE package'],
      transactionHandling: 'Read-only operation, no transaction commit/rollback required'
    },
    
    // Versioning
    versioning: {
      currentVersion: 'v1.0',
      changeLog: [
        'v1.0 (2022-08-15) - Initial release',
        'v1.1 (2023-03-20) - Added error handling for NULL bank IDs',
        'v1.2 (2024-01-10) - Performance optimization with index'
      ],
      compatibility: 'Backward compatible - all versions supported'
    },
    
    // Performance
    performance: {
      rateLimits: 'No explicit limit - governed by database connection pool (max 100 concurrent)',
      timeouts: '30 seconds query timeout',
      expectedResponseTime: '45ms average'
    },
    
    // Monitoring
    monitoring: {
      loggingLocation: '/var/log/oracle/weblogic_dba.log',
      monitoringTool: 'Oracle Enterprise Manager + Grafana',
      errorReporting: 'PagerDuty alerts for failures, Jira for tracking'
    },
    
    // Consumer Guidelines
    consumerGuidelines: {
      sampleCode: 'DECLARE v_abi VARCHAR2(10); BEGIN v_abi := WEBLOGIC_DBA.CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK(12345); DBMS_OUTPUT.PUT_LINE(v_abi); END;',
      retryLogic: 'Retry up to 3 times with exponential backoff (1s, 2s, 4s) for ORA-00060 (deadlock) errors',
      bestPractices: 'Cache results for 24 hours to reduce database load. Always validate IN_ID_BANCA before calling. Handle NULL returns gracefully.'
    },
    
    // Support
    support: {
      apiOwner: 'Patricia Wong (patricia.wong@company.com)',
      supportChannel: 'Email: dba-team@company.com | Slack: #oracle-db | Jira: DBA Project'
    },
    
    // Legacy fields for backward compatibility
    documentation: {
      url: 'https://docs.company.com/oracle/weblogic-crc-interface',
      hasInteractiveDocs: false,
    },
    dependencies: [],
    dependents: ['java-001', 'java-002', 'rest-001', 'rest-002', 'oracle-002'],
    usage: {
      requestsPerDay: 450000,
      uniqueUsers: 1200,
    },
    technical: {
      baseUrl: 'oracle://weblogic.company.com:1521/PROD',
      connectionString: 'jdbc:oracle:thin:@weblogic.company.com:1521:PROD',
      schemaName: 'WEBLOGIC_DBA',
      procedureName: 'CRC_PKG_EXT_INTERFACE.CRC_FN_ABI_BY_ID_BANK',
      functionSignature: 'CRC_FN_ABI_BY_ID_BANK(IN_ID_BANCA IN NUMBER) RETURN VARCHAR2',
      authMethod: 'Oracle Wallet + Service Account',
      responseTime: 45,
      slaUptime: 99.9,
    },
    contact: {
      email: 'dba-team@company.com',
      team: 'Database Administration',
      slackChannel: '#oracle-db',
    },
    sampleRequest: {
      parameters: [
        {
          name: 'IN_ID_BANCA',
          value: 12345,
          type: 'NUMBER'
        }
      ]
    },
    sampleResponse: {
      success: true,
      data: [
        {
          ABI_CODE: '03069'
        }
      ],
      executionTime: 45,
      procedureName: 'CRC_FN_ABI_BY_ID_BANK',
      schemaName: 'WEBLOGIC_DBA',
      returnType: 'VARCHAR2'
    }
  },
  {
    id: 'oracle-002',
    name: 'Data Warehouse API',
    type: 'ORACLE_API',
    category: 'analytics',
    status: 'active',
    version: '21c Enterprise',
    description: 'Enterprise data warehouse with OLAP capabilities, dimensional modeling, and advanced analytics for business intelligence and reporting.',
    tags: ['data-warehouse', 'olap', 'analytics', 'reporting', 'bi'],
    owner: 'Kevin Zhang',
    department: 'Data & Analytics',
    lastUpdated: '2024-10-23T14:45:00Z',
    createdAt: '2023-01-30T09:30:00Z',
    documentation: {
      url: 'https://docs.company.com/oracle/data-warehouse',
      hasInteractiveDocs: false,
    },
    dependencies: ['oracle-001'],
    dependents: ['java-002', 'rest-003'],
    usage: {
      requestsPerDay: 85000,
      uniqueUsers: 320,
    },
    technical: {
      baseUrl: 'oracle://dw.company.com:1521/DW',
      connectionString: 'jdbc:oracle:thin:@dw.company.com:1521:DW',
      schemaName: 'DW_ANALYTICS',
      procedureName: 'PKG_ANALYTICS.SP_AGGREGATE_DATA',
      authMethod: 'Oracle Wallet + LDAP',
      responseTime: 180,
      slaUptime: 99.5,
    },
    contact: {
      email: 'dw-team@company.com',
      team: 'Data Warehouse',
      slackChannel: '#data-warehouse',
    },
    sampleRequest: {
      query: 'OLAP_AGGREGATE',
      dimensions: ['time', 'product', 'region'],
      measures: ['sales_amount', 'quantity', 'profit'],
      timeRange: {
        start: '2024-01-01',
        end: '2024-10-23'
      },
      filters: {
        region: ['North', 'South'],
        product_category: 'Electronics'
      },
      aggregation: 'SUM'
    },
    sampleResponse: {
      success: true,
      queryId: 'QRY_DW_789',
      resultCount: 245,
      data: [
        {
          time_period: '2024-Q3',
          product: 'Laptop Pro',
          region: 'North',
          sales_amount: 1500000,
          quantity: 500,
          profit: 450000
        },
        {
          time_period: '2024-Q3',
          product: 'Tablet Max',
          region: 'South',
          sales_amount: 950000,
          quantity: 800,
          profit: 285000
        }
      ],
      executionTime: 180,
      timestamp: '2024-10-23T14:45:00Z'
    }
  },
  {
    id: 'oracle-003',
    name: 'Legacy ERP Integration',
    type: 'ORACLE_API',
    category: 'integration',
    status: 'deprecated',
    version: '11g Standard',
    description: 'Legacy Oracle ERP system integration. Scheduled for decommission in Q2 2025. Use Modern ERP API instead.',
    tags: ['erp', 'legacy', 'integration', 'deprecated'],
    owner: 'Nancy Brown',
    department: 'Enterprise Systems',
    lastUpdated: '2024-06-15T10:00:00Z',
    createdAt: '2020-03-10T08:00:00Z',
    documentation: {
      url: 'https://docs.company.com/oracle/legacy-erp',
      hasInteractiveDocs: false,
    },
    dependencies: ['oracle-001'],
    dependents: [],
    usage: {
      requestsPerDay: 8000,
      uniqueUsers: 25,
    },
    technical: {
      baseUrl: 'oracle://legacy.company.com:1521/ERP',
      connectionString: 'jdbc:oracle:thin:@legacy.company.com:1521:ERP',
      schemaName: 'ERP_LEGACY',
      procedureName: 'PKG_ERP.SP_GET_ORDERS',
      authMethod: 'Legacy Oracle Authentication',
      responseTime: 500,
      slaUptime: 95.0,
    },
    contact: {
      email: 'erp-team@company.com',
      team: 'Enterprise Systems',
      slackChannel: '#legacy-systems',
    },
    sampleRequest: {
      operation: 'GET_ORDERS',
      parameters: {
        customer_id: 'CUST_9876',
        date_from: '2024-01-01',
        date_to: '2024-06-15',
        status: 'COMPLETED'
      }
    },
    sampleResponse: {
      success: true,
      deprecationWarning: 'This API will be decommissioned in Q2 2025. Please migrate to Modern ERP API.',
      recordCount: 12,
      data: [
        {
          order_id: 'ORD_54321',
          customer_id: 'CUST_9876',
          order_date: '2024-03-15',
          total_amount: 5400.00,
          status: 'COMPLETED'
        }
      ],
      executionTime: 500,
      timestamp: '2024-06-15T10:00:00Z'
    }
  },
];