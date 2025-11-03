import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeOperationError } from 'n8n-workflow';

export class AnchorBrowser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Anchor Browser',
		name: 'anchorBrowser',
		icon: { light: 'file:light_logo.svg', dark: 'file:dark_logo.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Anchor Browser API for browser automation and control',
		defaults: {
			name: 'Anchor Browser',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'anchorBrowserApi',
				
			},
		],
		requestDefaults: {
			baseURL: 'https://api.anchorbrowser.io',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-Client-Source': 'n8n-anchorbrowser-node',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Browser Session',
						value: 'session',
					},
					{
						name: 'OS Level Control',
						value: 'osControl',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Tool',
						value: 'tools',
					},
				],
				default: 'session',
			},
			// Browser Session Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['session'],
					},
				},
				options: [
					{
						name: 'Create Session',
						value: 'create',
						description: 'Start a new browser session',
						action: 'Create browser session',
					},
					{
						name: 'End All',
						value: 'endAll',
						description: 'End all browser sessions',
						action: 'End all browser sessions',
					},
					{
						name: 'End Session',
						value: 'end',
						description: 'End a specific browser session',
						action: 'End browser session',
					},
					{
						name: 'Get Downloads',
						value: 'getDownloads',
						description: 'Get session downloads',
						action: 'Get session downloads',
					},
					{
						name: 'Get Recordings',
						value: 'getRecordings',
						description: 'Get session recordings',
						action: 'Get session recordings',
					},
					{
						name: 'Get Session',
						value: 'get',
						description: 'Get details of a specific session',
						action: 'Get browser session',
					},
					{
						name: 'List All',
						value: 'listAll',
						description: 'List all browser sessions',
						action: 'List all browser sessions',
					},
				],
				default: 'create',
			},
			// Profile Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['profile'],
					},
				},
				options: [
					{
						name: 'Delete Profile',
						value: 'delete',
						description: 'Delete a profile',
						action: 'Delete profile',
					},
					{
						name: 'Get Profile',
						value: 'get',
						description: 'Get details of a specific profile',
						action: 'Get profile',
					},
					{
						name: 'List Profiles',
						value: 'list',
						description: 'List all profiles',
						action: 'List all profiles',
					},
					{
						name: 'Update Profile',
						value: 'update',
						description: 'Update an existing profile',
						action: 'Update profile',
					},
				],
				default: 'list',
			},
			// Tools Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tools'],
					},
				},
				options: [
					{
						name: 'Fetch Webpage',
						value: 'fetchWebpage',
						description: 'Get webpage content as HTML or Markdown',
						action: 'Fetch webpage',
					},
					{
						name: 'Perform Web Task',
						value: 'performWebTask',
						description: 'Perform an AI-powered web task',
						action: 'Perform web task',
					},
					{
						name: 'Take Screenshot',
						value: 'screenshot',
						description: 'Take a screenshot of a webpage',
						action: 'Take screenshot',
					},
				],
				default: 'fetchWebpage',
			},
			// Task Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				options: [
					{
						name: 'Create Task',
						value: 'create',
						description: 'Create a new task or update existing task',
						action: 'Create task',
					},
					{
						name: 'Delete Task',
						value: 'delete',
						description: 'Delete a task',
						action: 'Delete task',
					},
					{
						name: 'Deploy Task',
						value: 'deploy',
						description: 'Deploy a task version',
						action: 'Deploy task',
					},
					{
						name: 'List Executions',
						value: 'listExecutions',
						description: 'List task execution results',
						action: 'List task executions',
					},
					{
						name: 'List Tasks',
						value: 'list',
						description: 'List all tasks',
						action: 'List tasks',
					},
					{
						name: 'Run Task',
						value: 'run',
						description: 'Execute a task',
						action: 'Run task',
					},
				],
				default: 'list',
			},
			// List Tasks Configuration
			{
				displayName: 'List Tasks Configuration',
				name: 'listTasksConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'string',
						default: '1',
						description: 'Page number',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'string',
						default: '10',
						description: 'Number of results per page',
					},
				],
			},
			// OS Level Control Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['osControl'],
					},
				},
				options: [
					{
						name: 'Copy Text',
						value: 'copyText',
						description: 'Copy selected text',
						action: 'Copy text',
					},
					{
						name: 'Drag and Drop',
						value: 'dragDrop',
						description: 'Perform drag and drop',
						action: 'Drag and drop',
					},
					{
						name: 'Get Clipboard',
						value: 'getClipboard',
						description: 'Get clipboard content',
						action: 'Get clipboard',
					},
					{
						name: 'Keyboard Shortcut',
						value: 'keyboardShortcut',
						description: 'Perform keyboard shortcut',
						action: 'Use keyboard shortcut',
					},
					{
						name: 'Mouse Click',
						value: 'mouseClick',
						description: 'Perform a mouse click',
						action: 'Click mouse',
					},
					{
						name: 'Mouse Double Click',
						value: 'mouseDoubleClick',
						description: 'Perform a double click',
						action: 'Double click mouse',
					},
					{
						name: 'Mouse Move',
						value: 'mouseMove',
						description: 'Move mouse cursor',
						action: 'Move mouse',
					},
					{
						name: 'Navigate to URL',
						value: 'navigate',
						description: 'Navigate to a URL',
						action: 'Navigate to URL',
					},
					{
						name: 'Paste Text',
						value: 'pasteText',
						action: 'Paste text',
					},
					{
						name: 'Scroll',
						value: 'scroll',
						description: 'Scroll the page',
						action: 'Scroll page',
					},
					{
						name: 'Set Clipboard',
						value: 'setClipboard',
						description: 'Set clipboard content',
						action: 'Set clipboard',
					},
					{
						name: 'Take Screenshot',
						value: 'screenshot',
						description: 'Take a screenshot of current session',
						action: 'Take screenshot',
					},
					{
						name: 'Type Text',
						value: 'typeText',
						description: 'Type text with keyboard',
						action: 'Type text',
					},
				],
				default: 'mouseClick',
			},
			// Base URL field (for all operations)
			{
				displayName: 'Base URL',
				name: 'baseUrl',
				type: 'string',
				default: 'https://api.anchorbrowser.io',
				description: 'The base URL for the Anchor Browser API',
			},
			// Session ID field (for session and osControl operations)
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				default: '',
				
				displayOptions: {
					show: {
						resource: ['session', 'osControl'],
						operation: ['get', 'end', 'getRecordings', 'getDownloads', 'mouseClick', 'mouseDoubleClick', 'mouseMove', 'dragDrop', 'scroll', 'typeText', 'keyboardShortcut', 'getClipboard', 'setClipboard', 'copyText', 'pasteText', 'navigate', 'screenshot'],
					},
				},
				description: 'The ID of the browser session (required for all operations except create and listAll)',
			},
			// Session ID field (for tools operations)
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				default: '',
				
				displayOptions: {
					show: {
						resource: ['tools'],
						operation: ['fetchWebpage', 'performWebTask', 'screenshot'],
					},
				},
				description: 'The ID of the browser session (optional - if not provided, a new session will be created)',
			},
			// Task ID field (for task operations)
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['delete', 'run', 'deploy', 'listExecutions'],
					},
				},
				description: 'The ID of the task (required for most task operations)',
			},
			// Profile Name field (used by profile operations)
			{
				displayName: 'Profile Name',
				name: 'profileName',
				type: 'string',
				default: '',
				
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['get', 'update', 'delete'],
					},
				},
				description: 'The name of the profile (required)',
			},
			// Session Configuration (for create session)
			{
				displayName: 'Session Configuration',
				name: 'sessionConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Idle Timeout (Minutes)',
						name: 'idleTimeout',
						type: 'number',
						default: 5,
						description: 'The amount of time (in minutes) the browser session waits for new connections after all others are closed before stopping',
					},
					{
						displayName: 'Initial URL',
						name: 'initialUrl',
						type: 'string',
						default: '',
						description: 'The URL to navigate to when the browser session starts',
					},
					{
						displayName: 'Max Duration (Minutes)',
						name: 'maxDuration',
						type: 'number',
						default: 20,
						description: 'Maximum amount of time (in minutes) for the browser to run before terminating',
					},
					{
						displayName: 'Read Only Live View',
						name: 'readOnlyLiveView',
						type: 'boolean',
						default: false,
						description: 'Whether to enable or disable read-only mode for live viewing',
					},
					{
						displayName: 'Recording Active',
						name: 'recordingActive',
						type: 'boolean',
						default: true,
						description: 'Whether to enable or disable video recording of the browser session',
					},
				],
			},
			// Browser Configuration (for create session)
			{
				displayName: 'Browser Configuration',
				name: 'browserConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Adblock Active',
						name: 'adblockActive',
						type: 'boolean',
						default: true,
						description: 'Whether to enable or disable ad-blocking',
					},
					{
						displayName: 'Captcha Solver Active',
						name: 'captchaSolverActive',
						type: 'boolean',
						default: false,
						description: 'Whether to enable or disable captcha-solving',
					},
					{
						displayName: 'Disable Web Security',
						name: 'disableWebSecurity',
						type: 'boolean',
						default: false,
						description: 'Whether to disable web security features (CORS, same-origin policy, etc.)',
					},
					{
						displayName: 'Fullscreen Mode',
						name: 'fullscreenMode',
						type: 'boolean',
						default: false,
						description: 'Whether to enable or disable fullscreen mode',
					},
					{
						displayName: 'Headless Mode',
						name: 'headlessMode',
						type: 'boolean',
						default: false,
						description: 'Whether the browser should be headless or headful',
					},
					{
						displayName: 'P2P Download Active',
						name: 'p2pDownloadActive',
						type: 'boolean',
						default: false,
						description: 'Whether to enable or disable P2P downloads',
					},
					{
						displayName: 'Persist Profile',
						name: 'persistProfile',
						type: 'boolean',
						default: false,
						description: 'Whether the browser session profile data should be saved when the browser session ends',
					},
					{
						displayName: 'Popup Blocker Active',
						name: 'popupBlockerActive',
						type: 'boolean',
						default: true,
						description: 'Whether to block popups, including ads and CAPTCHA consent banners',
					},
					{
						displayName: 'Profile Name',
						name: 'profileName',
						type: 'string',
						default: '',
						description: 'The name of the profile to be used during the browser session',
					},
					{
						displayName: 'Reset Profile Preferences',
						name: 'resetProfilePreferences',
						type: 'boolean',
						default: false,
						description: 'Whether to reset the profile preferences on session creation',
					},
					{
						displayName: 'Viewport Height',
						name: 'viewportHeight',
						type: 'number',
						default: 900,
						description: 'Height of the viewport in pixels',
					},
					{
						displayName: 'Viewport Width',
						name: 'viewportWidth',
						type: 'number',
						default: 1440,
						description: 'Width of the viewport in pixels',
					},
				],
			},
			// Proxy Configuration (for create session)
			{
				displayName: 'Proxy Configuration',
				name: 'proxyConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'City name for precise geographic targeting (anchor_proxy only)',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: '',
						placeholder: 'e.g. us',
						description: 'Country code for proxy (e.g., us, gb, de)',
					},
					{
						displayName: 'Custom Proxy Password',
						name: 'customProxyPassword',
						type: 'string',
						typeOptions: {
							password: true,
						},
						default: '',
						displayOptions: {
							show: {
								proxyType: ['custom'],
							},
						},
					},
					{
						displayName: 'Custom Proxy Server',
						name: 'customProxyServer',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								proxyType: ['custom'],
							},
						},
						description: 'Custom proxy server address',
					},
					{
						displayName: 'Custom Proxy Username',
						name: 'customProxyUsername',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								proxyType: ['custom'],
							},
						},
					},
					{
						displayName: 'Proxy Active',
						name: 'proxyActive',
						type: 'boolean',
						default: false,
						description: 'Whether to enable or disable proxy',
					},
					{
						displayName: 'Proxy Type',
						name: 'proxyType',
						type: 'options',
						options: [
							{
								name: 'Anchor Government',
								value: 'anchor_gov',
							},
							{
								name: 'Anchor Mobile',
								value: 'anchor_mobile',
							},
							{
								name: 'Anchor Proxy',
								value: 'anchor_proxy',
							},
							{
								name: 'Anchor Residential',
								value: 'anchor_residential',
							},
							{
								name: 'Custom Proxy',
								value: 'custom',
							},
						],
						default: 'anchor_proxy',
						description: 'Type of proxy to use',
					},
					{
						displayName: 'Region',
						name: 'region',
						type: 'string',
						default: '',
						description: 'Region code for more specific geographic targeting',
					},
				],
			},
			// Update Profile Configuration
			{
				displayName: 'Update Fields',
				name: 'updateProfileConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'A description of the profile (required)',
					},
				],
			},
			// Fetch Webpage Configuration
			{
				displayName: 'Fetch Webpage Configuration',
				name: 'fetchWebpageConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['tools'],
						operation: ['fetchWebpage'],
					},
				},
				options: [
					{
						displayName: 'Format',
						name: 'format',
						type: 'options',
						options: [
							{
								name: 'HTML',
								value: 'html',
							},
							{
								name: 'Markdown',
								value: 'markdown',
							},
						],
						default: 'markdown',
						description: 'The output format of the content',
					},
					{
						displayName: 'Goto Timeout (Ms)',
						name: 'gotoTimeout',
						type: 'number',
						default: 20000,
						description: 'Timeout for navigation in milliseconds',
					},
					{
						displayName: 'New Page',
						name: 'newPage',
						type: 'boolean',
						default: false,
						description: 'Whether to create a new page for the content',
					},
					{
						displayName: 'Page Index',
						name: 'pageIndex',
						type: 'number',
						default: 0,
						description: 'The index of the page to fetch content from',
					},
					{
						displayName: 'Return Partial on Timeout',
						name: 'returnPartialOnTimeout',
						type: 'boolean',
						default: false,
						description: 'Whether to return partial content if not loaded within 20 seconds',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'The URL to fetch content from (required)',
					},
					{
						displayName: 'Wait Time (Ms)',
						name: 'waitTime',
						type: 'number',
						default: 500,
						description: 'The time to wait for dynamic content to load in milliseconds',
					},
				],
			},
			// Perform Web Task Configuration
			{
				displayName: 'Perform Web Task Configuration',
				name: 'performWebTaskConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['tools'],
						operation: ['performWebTask'],
					},
				},
				options: [
					{
						displayName: 'Agent',
						name: 'agent',
						type: 'options',
						options: [
							{
								name: 'Browser Use',
								value: 'browser-use',
							},
							{
								name: 'Gemini Computer Use',
								value: 'gemini-computer-use',
							},
							{
								name: 'OpenAI CUA',
								value: 'openai-cua',
							},
						],
						default: 'browser-use',
						description: 'The AI agent to use for task completion',
					},
					{
						displayName: 'Detect Elements',
						name: 'detectElements',
						type: 'boolean',
						default: false,
						description: 'Whether to detect elements during task execution',
					},
					{
						displayName: 'Extended System Message',
						name: 'extendedSystemMessage',
						type: 'string',
						default: '',
						description: 'Extended system message to provide additional context for the AI agent',
					},
					{
						displayName: 'Highlight Elements',
						name: 'highlightElements',
						type: 'boolean',
						default: true,
						description: 'Whether to highlight elements during task execution',
					},
					{
						displayName: 'Human Intervention',
						name: 'humanIntervention',
						type: 'boolean',
						default: false,
						description: 'Whether to allow human intervention during task execution',
					},
					{
						displayName: 'Max Steps',
						name: 'maxSteps',
						type: 'number',
						default: 40,
						description: 'Maximum number of steps for task completion',
					},
					{
						displayName: 'Model',
						name: 'model',
						type: 'string',
						default: 'gpt-4o',
						description: 'The specific model to use for task completion',
					},
					{
						displayName: 'Output Schema',
						name: 'outputSchema',
						type: 'json',
						default: '{}',
						description: 'JSON Schema defining the expected structure of the output data. Example: {"type": "object", "properties": {"name": {"type": "string"}, "price": {"type": "number"}, "available": {"type": "boolean"}}}.',
					},
					{
						displayName: 'Prompt',
						name: 'prompt',
						type: 'string',
						default: '',
						description: 'The task to be autonomously completed. When using Output Schema, be specific about what data to extract. (required).',
					},
					{
						displayName: 'Provider',
						name: 'provider',
						type: 'options',
						options: [
							{
								name: 'Azure',
								value: 'azure',
							},
							{
								name: 'Gemini',
								value: 'gemini',
							},
							{
								name: 'Groq',
								value: 'groq',
							},
							{
								name: 'OpenAI',
								value: 'openai',
							},
							{
								name: 'xAI',
								value: 'xai',
							},
						],
						default: 'openai',
						description: 'The AI provider to use for task completion',
					},
					{
						displayName: 'Secret Values',
						name: 'secretValues',
						type: 'json',
						default: '{}',
						description: 'Secret values (key-value pairs) to be used during task execution. Keys must start with ANCHOR_.',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'The URL to perform the task on (required)',
					},
					{
						displayName: 'Use Vision',
						name: 'useVision',
						type: 'boolean',
						default: false,
						description: 'Whether to use vision capabilities for the AI agent',
					},
				],
			},
			// Screenshot Configuration
			{
				displayName: 'Screenshot Configuration',
				name: 'screenshotConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['tools'],
						operation: ['screenshot'],
					},
				},
				options: [
					{
						displayName: 'Capture Full Height',
						name: 'captureFullHeight',
						type: 'boolean',
						default: false,
						description: 'Whether to capture the entire height of the page',
					},
					{
						displayName: 'Height',
						name: 'height',
						type: 'number',
						default: 720,
						description: 'The height of the browser viewport in pixels',
					},
					{
						displayName: 'Image Quality',
						name: 'imageQuality',
						type: 'number',
						default: 70,
						description: 'Quality of the output image, on the range 1-100',
					},
					{
						displayName: 'Scroll All Content',
						name: 'scrollAllContent',
						type: 'boolean',
						default: false,
						description: 'Whether to scroll the page and capture all visible content',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'The URL to take screenshot of',
					},
					{
						displayName: 'Wait Time (Ms)',
						name: 'waitTime',
						type: 'number',
						default: 500,
						description: 'The time to wait for dynamic content to load in milliseconds',
					},
					{
						displayName: 'Width',
						name: 'width',
						type: 'number',
						default: 1280,
						description: 'The width of the browser viewport in pixels',
					},
				],
			},
			// Navigate Configuration (for navigate operation)
			{
				displayName: 'Navigate Configuration',
				name: 'navigateConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['navigate'],
					},
				},
				options: [
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'The URL to navigate to (required)',
					},
					{
						displayName: 'Delay',
						name: 'delay',
						type: 'number',
						default: 1000,
						description: 'Delay in milliseconds before navigation',
					},
				],
			},
			// Mouse Click Configuration
			{
				displayName: 'Mouse Click Configuration',
				name: 'mouseClickConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['mouseClick'],
					},
				},
				options: [
					{
						displayName: 'X Coordinate',
						name: 'x',
						type: 'number',
						default: 0,
						description: 'X coordinate for mouse click (required)',
					},
					{
						displayName: 'Y Coordinate',
						name: 'y',
						type: 'number',
						default: 0,
						
						description: 'Y coordinate for mouse click (required)',
					},
					{
						displayName: 'Button',
						name: 'button',
						type: 'options',
						options: [
							{
								name: 'Left',
								value: 'left',
							},
							{
								name: 'Middle',
								value: 'middle',
							},
							{
								name: 'Right',
								value: 'right',
							},
						],
						default: 'left',
						description: 'Mouse button to use',
					},
				],
			},
			// Mouse Double Click Configuration
			{
				displayName: 'Mouse Double Click Configuration',
				name: 'mouseDoubleClickConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['mouseDoubleClick'],
					},
				},
				options: [
					{
						displayName: 'X Coordinate',
						name: 'x',
						type: 'number',
						default: 0,
						description: 'X coordinate for mouse double click (required)',
					},
					{
						displayName: 'Y Coordinate',
						name: 'y',
						type: 'number',
						default: 0,
						
						description: 'Y coordinate for mouse double click (required)',
					},
					{
						displayName: 'Button',
						name: 'button',
						type: 'options',
						options: [
							{
								name: 'Left',
								value: 'left',
							},
							{
								name: 'Middle',
								value: 'middle',
							},
							{
								name: 'Right',
								value: 'right',
							},
						],
						default: 'left',
						description: 'Mouse button to use',
					},
				],
			},
			// Mouse Move Configuration
			{
				displayName: 'Mouse Move Configuration',
				name: 'mouseMoveConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['mouseMove'],
					},
				},
				options: [
					{
						displayName: 'X Coordinate',
						name: 'x',
						type: 'number',
						default: 0,
						description: 'X coordinate for mouse move (required)',
					},
					{
						displayName: 'Y Coordinate',
						name: 'y',
						type: 'number',
						default: 0,
						
						description: 'Y coordinate for mouse move (required)',
					},
				],
			},
			// Scroll Configuration
			{
				displayName: 'Scroll Configuration',
				name: 'scrollConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['scroll'],
					},
				},
				options: [
					{
						displayName: 'Delta X',
						name: 'deltaX',
						type: 'number',
						default: 0,
						description: 'Horizontal scroll amount (positive is right, negative is left)',
					},
					{
						displayName: 'Delta Y',
						name: 'deltaY',
						type: 'number',
						default: 0,
						description: 'Vertical scroll amount (positive is down, negative is up)',
					},
					{
						displayName: 'Steps',
						name: 'steps',
						type: 'number',
						default: 1,
						description: 'Number of steps to break the scroll into for smoother scrolling',
					},
					{
						displayName: 'Use OS Scroll',
						name: 'useOs',
						type: 'boolean',
						default: true,
						description: 'Whether to use the OS scroll or the Playwright scroll',
					},
					{
						displayName: 'X Coordinate',
						name: 'x',
						type: 'number',
						default: 0,
						
						description: 'X coordinate for scroll (required)',
					},
					{
						displayName: 'Y Coordinate',
						name: 'y',
						type: 'number',
						default: 0,
						
						description: 'Y coordinate for scroll (required)',
					},
				],
			},
			// Drag and Drop Configuration
			{
				displayName: 'Drag and Drop Configuration',
				name: 'dragDropConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['dragDrop'],
					},
				},
				options: [
					{
						displayName: 'Button',
						name: 'button',
						type: 'options',
						options: [
							{
								name: 'Left',
								value: 'left',
							},
							{
								name: 'Middle',
								value: 'middle',
							},
							{
								name: 'Right',
								value: 'right',
							},
						],
						default: 'left',
						description: 'Mouse button to use',
					},
					{
						displayName: 'End X',
						name: 'endX',
						type: 'number',
						default: 0,
						
						description: 'Ending X coordinate for drag and drop (required)',
					},
					{
						displayName: 'End Y',
						name: 'endY',
						type: 'number',
						default: 0,
						
						description: 'Ending Y coordinate for drag and drop (required)',
					},
					{
						displayName: 'Start X',
						name: 'startX',
						type: 'number',
						default: 0,
						
						description: 'Starting X coordinate for drag and drop (required)',
					},
					{
						displayName: 'Start Y',
						name: 'startY',
						type: 'number',
						default: 0,
						
						description: 'Starting Y coordinate for drag and drop (required)',
					},
				],
			},
			// Type Text Configuration
			{
				displayName: 'Type Text Configuration',
				name: 'typeTextConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['typeText'],
					},
				},
				options: [
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Text to type (required)',
					},
					{
						displayName: 'Delay',
						name: 'delay',
						type: 'number',
						default: 0,
						description: 'Delay between keystrokes in milliseconds',
					},
				],
			},
			// Keyboard Shortcut Configuration
			{
				displayName: 'Keyboard Shortcut Configuration',
				name: 'keyboardShortcutConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['keyboardShortcut'],
					},
				},
				options: [
					{
						displayName: 'Keys',
						name: 'keys',
						type: 'string',
						default: '',
						placeholder: 'e.g. Ctrl,Shift,A',
						description: 'Comma-separated list of keys to press simultaneously (e.g., "Ctrl,Shift,A") (required)',
					},
					{
						displayName: 'Hold Time',
						name: 'holdTime',
						type: 'number',
						default: 0,
						description: 'Time to hold the keys down in milliseconds',
					},
				],
			},
			// Clipboard Configuration
			{
				displayName: 'Clipboard Configuration',
				name: 'clipboardConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['osControl'],
						operation: ['setClipboard', 'copyText', 'pasteText'],
					},
				},
				options: [
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Text to set in clipboard or copy/paste',
					},
				],
			},
			// Create Task Configuration
			{
				displayName: 'Create Task Configuration',
				name: 'createTaskConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Task name (letters, numbers, hyphens, and underscores only)',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Optional description of the task',
					},
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Base64 encoded task code (optional)',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{
								name: 'TypeScript',
								value: 'typescript',
							},
						],
						default: 'typescript',
						description: 'Programming language for the task',
					},
				],
			},
			// Run Task Configuration
			{
				displayName: 'Run Task Configuration',
				name: 'runTaskConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['run'],
					},
				},
				options: [
					{
						displayName: 'Version',
						name: 'version',
						type: 'string',
						default: 'latest',
						description: 'Version to run (draft, latest, or version number)',
					},
					{
						displayName: 'Session ID',
						name: 'sessionId',
						type: 'string',
						default: '',
						description: 'Optional existing session ID to use',
					},
					{
						displayName: 'Inputs',
						name: 'inputs',
						type: 'json',
						default: '{}',
						description: 'Environment variables for task execution (keys must start with ANCHOR_)',
					},
				],
			},
			// Deploy Task Configuration
			{
				displayName: 'Deploy Task Configuration',
				name: 'deployTaskConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['deploy'],
					},
				},
				options: [
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Base64 encoded task code (required for new versions)',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{
								name: 'TypeScript',
								value: 'typescript',
							},
						],
						default: 'typescript',
						description: 'Programming language for the task',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Optional description of the version',
					},
				],
			},
			// List Executions Configuration
			{
				displayName: 'List Executions Configuration',
				name: 'listExecutionsConfig',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['task'],
						operation: ['listExecutions'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'string',
						default: '1',
						description: 'Page number',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'string',
						default: '10',
						description: 'Number of results per page',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'All',
								value: '',
							},
							{
								name: 'Cancelled',
								value: 'cancelled',
							},
							{
								name: 'Failure',
								value: 'failure',
							},
							{
								name: 'Success',
								value: 'success',
							},
							{
								name: 'Timeout',
								value: 'timeout',
							},
						],
						default: '',
						description: 'Filter by execution status',
					},
					{
						displayName: 'Version',
						name: 'version',
						type: 'string',
						default: '',
						description: 'Filter by task version (draft, latest, or version number)',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				if (resource === 'session') {
					responseData = await AnchorBrowser.executeSessionOperation(this, operation, i);
				} else if (resource === 'profile') {
					responseData = await AnchorBrowser.executeProfileOperation(this, operation, i);
				} else if (resource === 'tools') {
					responseData = await AnchorBrowser.executeToolsOperation(this, operation, i);
				} else if (resource === 'osControl') {
					responseData = await AnchorBrowser.executeOSControlOperation(this, operation, i);
				} else if (resource === 'task') {
					responseData = await AnchorBrowser.executeTaskOperation(this, operation, i);
				}

				// Handle different response structures based on operation
				let processedData = responseData;
				let binaryData = undefined;
				
				if (resource === 'tools' && operation === 'performWebTask') {
					// For performWebTask, extract the result from the nested structure
					if (responseData?.data?.result) {
						processedData = responseData.data.result;
					} else {
						processedData = responseData;
					}
				}
				// For fetchWebpage, ensure content is properly formatted as a single string
				else if (resource === 'tools' && operation === 'fetchWebpage') {
					if (typeof responseData === 'string') {
						processedData = {
							content: responseData,
							length: responseData.length,
							timestamp: new Date().toISOString(),
						};
					} else if (responseData?.content) {
						processedData = {
							...responseData,
							timestamp: new Date().toISOString(),
						};
					} else {
						processedData = responseData;
					}
				}
				// For screenshot operations, handle special binary data format
				if ((resource === 'tools' || resource === 'osControl') && operation === 'screenshot' && responseData?.binary) {
					processedData = responseData.json;
					binaryData = responseData.binary;
				}
				// For create session, extract the sessionId for easier use
				else if (resource === 'session' && operation === 'create' && responseData?.id) {
					processedData = {
						...responseData,
						sessionId: responseData.id, // Add sessionId alias
						cdpUrl: responseData.cdp_url,
						liveViewUrl: responseData.live_view_url,
					};
				}
				// For list all sessions, format the response
				else if (resource === 'session' && operation === 'listAll' && Array.isArray(responseData?.items)) {
					processedData = {
						sessions: responseData.items.map((session: any) => ({
							sessionId: session.session_id,
							status: session.status,
							tags: session.tags,
							createdAt: session.created_at,
						})),
						total: responseData.items.length,
					};
				}

				const returnItem: any = {
					json: processedData,
					pairedItem: { item: i },
				};
				
				// Add binary data if present (for screenshots)
				if (binaryData) {
					returnItem.binary = binaryData;
				}
				
				returnData.push(returnItem);
			} catch (error: any) {
				// Handle API error responses
				let errorMessage = error.message;
				let errorCode = error.code;
				
				if (error.response?.data?.error) {
					errorMessage = error.response.data.error.message || error.response.data.error;
					errorCode = error.response.data.error.code;
				} else if (error.response?.data) {
					errorMessage = error.response.data.message || error.response.data;
				}
				
				if (this.continueOnFail()) {
					returnData.push({
						json: { 
							error: errorMessage,
							code: errorCode,
							status: error.response?.status,
						},
						pairedItem: { item: i },
					});
				} else {
					throw new NodeOperationError(this.getNode(), errorMessage);
				}
			}
		}

		return [returnData];
	}

	private static async executeSessionOperation(context: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
		const baseUrl = context.getNodeParameter('baseUrl', itemIndex, 'https://api.anchorbrowser.io') as string;

		switch (operation) {
			case 'create': {
				const sessionConfig = context.getNodeParameter('sessionConfig', itemIndex, {}) as any;
				const browserConfig = context.getNodeParameter('browserConfig', itemIndex, {}) as any;
				const proxyConfig = context.getNodeParameter('proxyConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved sessionConfig: ' + JSON.stringify(sessionConfig, null, 2));
				context.logger?.info('Retrieved browserConfig: ' + JSON.stringify(browserConfig, null, 2));
				context.logger?.info('Retrieved proxyConfig: ' + JSON.stringify(proxyConfig, null, 2));

				// Map session configuration to correct API structure
				// The API expects a nested structure with 'session' and 'browser' objects
				const body: any = {};
				
				// Build session configuration
				const sessionConfigBody: any = {};
				
				// Initial URL
				if (sessionConfig.initialUrl !== undefined) {
					sessionConfigBody.initial_url = sessionConfig.initialUrl;
				}
				
				// Timeout configuration
				const timeoutConfig: any = {};
				if (sessionConfig.idleTimeout !== undefined) {
					timeoutConfig.idle_timeout = sessionConfig.idleTimeout;
				}
				if (sessionConfig.maxDuration !== undefined) {
					timeoutConfig.max_duration = sessionConfig.maxDuration;
				}
				if (Object.keys(timeoutConfig).length > 0) {
					sessionConfigBody.timeout = timeoutConfig;
				}
				
				// Recording configuration
				if (sessionConfig.recordingActive !== undefined) {
					sessionConfigBody.recording = {
						active: sessionConfig.recordingActive,
					};
				}
				
				// Live view configuration
				if (sessionConfig.readOnlyLiveView !== undefined) {
					sessionConfigBody.live_view = {
						read_only: sessionConfig.readOnlyLiveView,
					};
				}
				
				// Proxy configuration
				const proxyConfigBody: any = {};
				if (proxyConfig.proxyActive !== undefined) {
					proxyConfigBody.active = proxyConfig.proxyActive;
				}
				if (proxyConfig.proxyType !== undefined) {
					proxyConfigBody.type = proxyConfig.proxyType;
				}
				if (proxyConfig.countryCode !== undefined) {
					proxyConfigBody.country_code = proxyConfig.countryCode;
				}
				if (proxyConfig.region !== undefined) {
					proxyConfigBody.region = proxyConfig.region;
				}
				if (proxyConfig.city !== undefined) {
					proxyConfigBody.city = proxyConfig.city;
				}
				if (proxyConfig.customProxyServer !== undefined) {
					proxyConfigBody.server = proxyConfig.customProxyServer;
				}
				if (proxyConfig.customProxyUsername !== undefined) {
					proxyConfigBody.username = proxyConfig.customProxyUsername;
				}
				if (proxyConfig.customProxyPassword !== undefined) {
					proxyConfigBody.password = proxyConfig.customProxyPassword;
				}
				if (Object.keys(proxyConfigBody).length > 0) {
					sessionConfigBody.proxy = proxyConfigBody;
				}
				
				// Add session config to body if it has any properties
				if (Object.keys(sessionConfigBody).length > 0) {
					body.session = sessionConfigBody;
				}
				
				// Build browser configuration
				const browserConfigBody: any = {};
				
				// Adblock configuration
				if (browserConfig.adblockActive !== undefined) {
					browserConfigBody.adblock = {
						active: browserConfig.adblockActive,
					};
				}
				
				// Captcha solver configuration
				if (browserConfig.captchaSolverActive !== undefined) {
					browserConfigBody.captcha_solver = {
						active: browserConfig.captchaSolverActive,
					};
				}
				
				// Popup blocker configuration
				if (browserConfig.popupBlockerActive !== undefined) {
					browserConfigBody.popup_blocker = {
						active: browserConfig.popupBlockerActive,
					};
				}
				
				// Headless configuration
				if (browserConfig.headlessMode !== undefined) {
					browserConfigBody.headless = {
						active: browserConfig.headlessMode,
					};
				}
				
				// Fullscreen configuration
				if (browserConfig.fullscreenMode !== undefined) {
					browserConfigBody.fullscreen = {
						active: browserConfig.fullscreenMode,
					};
				}
				
				// Disable web security
				if (browserConfig.disableWebSecurity !== undefined) {
					browserConfigBody.disable_web_security = browserConfig.disableWebSecurity;
				}
				
				// P2P download configuration
				if (browserConfig.p2pDownloadActive !== undefined) {
					browserConfigBody.p2p_download = {
						active: browserConfig.p2pDownloadActive,
					};
				}
				
				// Viewport configuration
				const viewportConfig: any = {};
				if (browserConfig.viewportWidth !== undefined) {
					viewportConfig.width = browserConfig.viewportWidth;
				}
				if (browserConfig.viewportHeight !== undefined) {
					viewportConfig.height = browserConfig.viewportHeight;
				}
				if (Object.keys(viewportConfig).length > 0) {
					browserConfigBody.viewport = viewportConfig;
				}
				
				// Profile configuration
				if (browserConfig.profileName !== undefined || 
					browserConfig.persistProfile !== undefined || 
					browserConfig.resetProfilePreferences !== undefined) {
					browserConfigBody.profile = {};
					if (browserConfig.profileName !== undefined) {
						browserConfigBody.profile.name = browserConfig.profileName;
					}
					if (browserConfig.persistProfile !== undefined) {
						browserConfigBody.profile.persist = browserConfig.persistProfile;
					}
					if (browserConfig.resetProfilePreferences !== undefined) {
						browserConfigBody.profile.reset_preferences = browserConfig.resetProfilePreferences;
					}
				}
				
				// Add browser config to body if it has any properties
				if (Object.keys(browserConfigBody).length > 0) {
					body.browser = browserConfigBody;
				}

				// Debug: Log the request body to see what's being sent
				context.logger?.info('Session creation request body: ' + JSON.stringify(body, null, 2));

				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions`,
					body,
				});
			}

			case 'get': {
				const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/${sessionId}`,
				});
			}

			case 'listAll': {
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/all/status`,
				});
			}

			case 'end': {
				const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'DELETE',
					url: `${baseUrl}/v1/sessions/${sessionId}`,
				});
			}

			case 'endAll': {
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'DELETE',
					url: `${baseUrl}/v1/sessions/all`,
				});
			}

			case 'getRecordings': {
				const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/${sessionId}/recordings`,
				});
			}

			case 'getDownloads': {
				const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/${sessionId}/downloads`,
				});
			}


			default:
				throw new NodeOperationError(context.getNode(), `Unknown session operation: ${operation}`);
		}
	}

	private static async executeProfileOperation(context: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
		const baseUrl = context.getNodeParameter('baseUrl', itemIndex, 'https://api.anchorbrowser.io') as string;

		switch (operation) {
			case 'get': {
				const profileName = context.getNodeParameter('profileName', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/profiles/${profileName}`,
				});
			}

			case 'list': {
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/profiles`,
				});
			}

			case 'update': {
				const profileName = context.getNodeParameter('profileName', itemIndex) as string;
				const updateProfileConfig = context.getNodeParameter('updateProfileConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved updateProfileConfig: ' + JSON.stringify(updateProfileConfig, null, 2));
				
				// Validate required parameters
				if (!updateProfileConfig.description || updateProfileConfig.description.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Description is required for profile update operation');
				}
				
				// Map profile configuration to correct API structure
				const body: any = {
					description: updateProfileConfig.description,
				};
				
				// Debug: Log the request body
				context.logger?.info('Profile update request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'PUT',
					url: `${baseUrl}/v1/profiles/${profileName}`,
					body,
				});
			}

			case 'delete': {
				const profileName = context.getNodeParameter('profileName', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'DELETE',
					url: `${baseUrl}/v1/profiles/${profileName}`,
				});
			}

			default:
				throw new NodeOperationError(context.getNode(), `Unknown profile operation: ${operation}`);
		}
	}

	private static async executeToolsOperation(context: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
		const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
		const baseUrl = context.getNodeParameter('baseUrl', itemIndex, 'https://api.anchorbrowser.io') as string;

		switch (operation) {
			case 'fetchWebpage': {
				const fetchWebpageConfig = context.getNodeParameter('fetchWebpageConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved fetchWebpageConfig: ' + JSON.stringify(fetchWebpageConfig, null, 2));
				
				// Validate required parameters - either sessionId or URL must be provided
				const hasSessionId = sessionId && sessionId.trim() !== '';
				const hasUrl = fetchWebpageConfig.url && fetchWebpageConfig.url.trim() !== '';
				
				if (!hasSessionId && !hasUrl) {
					throw new NodeOperationError(context.getNode(), 'Either Session ID or URL is required for fetch webpage operation');
				}
				
				// Map n8n parameters to API parameters
				const apiBody: any = {};
				
				// Only include URL if provided
				if (hasUrl) {
					apiBody.url = fetchWebpageConfig.url;
				}
				if (fetchWebpageConfig.format !== undefined) {
					apiBody.format = fetchWebpageConfig.format;
				}
				if (fetchWebpageConfig.waitTime !== undefined) {
					apiBody.wait = fetchWebpageConfig.waitTime;
				}
				if (fetchWebpageConfig.newPage !== undefined) {
					apiBody.new_page = fetchWebpageConfig.newPage;
				}
				if (fetchWebpageConfig.pageIndex !== undefined) {
					apiBody.page_index = fetchWebpageConfig.pageIndex;
				}
				if (fetchWebpageConfig.returnPartialOnTimeout !== undefined) {
					apiBody.return_partial_on_timeout = fetchWebpageConfig.returnPartialOnTimeout;
				}
				if (fetchWebpageConfig.gotoTimeout !== undefined) {
					apiBody.goto_timeout = fetchWebpageConfig.gotoTimeout;
				}
				
				// Debug: Log the request body
				context.logger?.info('Fetch webpage request body: ' + JSON.stringify(apiBody, null, 2));
				
				// Only include sessionId in query string if provided
				const queryParams: any = {};
				if (sessionId && sessionId.trim() !== '') {
					queryParams.sessionId = sessionId;
				}
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/tools/fetch-webpage`,
					qs: queryParams,
					body: apiBody,
				});
			}

			case 'performWebTask': {
				const performWebTaskConfig = context.getNodeParameter('performWebTaskConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved performWebTaskConfig: ' + JSON.stringify(performWebTaskConfig, null, 2));
				
				// Validate required parameters
				if (!performWebTaskConfig.prompt || performWebTaskConfig.prompt.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Prompt is required for perform web task operation');
				}
				
				// Either sessionId or URL must be provided
				const hasSessionId = sessionId && sessionId.trim() !== '';
				const hasUrl = performWebTaskConfig.url && performWebTaskConfig.url.trim() !== '';
				
				if (!hasSessionId && !hasUrl) {
					throw new NodeOperationError(context.getNode(), 'Either Session ID or URL is required for perform web task operation');
				}
				
				// Map n8n parameters to API parameters
				const apiBody: any = {
					prompt: performWebTaskConfig.prompt,
				};
				
				// Only include URL if provided
				if (hasUrl) {
					apiBody.url = performWebTaskConfig.url;
				}
				if (performWebTaskConfig.agent !== undefined) {
					apiBody.agent = performWebTaskConfig.agent;
				}
				if (performWebTaskConfig.detectElements !== undefined) {
					apiBody.detect_elements = performWebTaskConfig.detectElements;
				}
				if (performWebTaskConfig.extendedSystemMessage !== undefined && performWebTaskConfig.extendedSystemMessage.trim() !== '') {
					apiBody.extended_system_message = performWebTaskConfig.extendedSystemMessage;
				}
				if (performWebTaskConfig.highlightElements !== undefined) {
					apiBody.highlight_elements = performWebTaskConfig.highlightElements;
				}
				if (performWebTaskConfig.humanIntervention !== undefined) {
					apiBody.human_intervention = performWebTaskConfig.humanIntervention;
				}
				if (performWebTaskConfig.maxSteps !== undefined) {
					apiBody.max_steps = performWebTaskConfig.maxSteps;
				}
				if (performWebTaskConfig.model !== undefined) {
					apiBody.model = performWebTaskConfig.model;
				}
				if (performWebTaskConfig.outputSchema !== undefined) {
					// Parse JSON if it's a string
					let outputSchema = performWebTaskConfig.outputSchema;
					if (typeof outputSchema === 'string') {
						try {
							outputSchema = JSON.parse(outputSchema);
						} catch (e) {
							throw new NodeOperationError(context.getNode(), 'Invalid JSON in Output Schema: ' + e.message);
						}
					}
					context.logger?.info('Output schema: ' + JSON.stringify(outputSchema, null, 2)); 
					apiBody.output_schema = outputSchema;
				}
				if (performWebTaskConfig.provider !== undefined) {
					apiBody.provider = performWebTaskConfig.provider;
				}
				if (performWebTaskConfig.secretValues !== undefined) {
					// Parse JSON if it's a string
					let secretValues = performWebTaskConfig.secretValues;
					if (typeof secretValues === 'string') {
						try {
							secretValues = JSON.parse(secretValues);
						} catch (e) {
							throw new NodeOperationError(context.getNode(), 'Invalid JSON in Secret Values: ' + e.message);
						}
					}
					apiBody.secret_values = secretValues;
				}
				if (performWebTaskConfig.useVision !== undefined) {
					apiBody.use_vision = performWebTaskConfig.useVision;
				}
				
				// Debug: Log the request body
				context.logger?.info('Perform web task request body: ' + JSON.stringify(apiBody, null, 2));
				
				// Only include sessionId in query string if provided
				const queryParams: any = {};
				if (sessionId && sessionId.trim() !== '') {
					queryParams.sessionId = sessionId;
				}
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/tools/perform-web-task`,
					qs: queryParams,
					body: apiBody,
				});
			}

			case 'screenshot': {
				const screenshotConfig = context.getNodeParameter('screenshotConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Screenshot Tools - Retrieved screenshotConfig: ' + JSON.stringify(screenshotConfig, null, 2));
				
				// Validate required parameters - either sessionId or URL must be provided
				const hasSessionId = sessionId && sessionId.trim() !== '';
				const hasUrl = screenshotConfig.url && screenshotConfig.url.trim() !== '';
				
				if (!hasSessionId && !hasUrl) {
					throw new NodeOperationError(context.getNode(), 'Either Session ID or URL is required for screenshot operation');
				}
				
				// Map n8n parameters to API parameters
				// Only include values that are actually configured (not undefined)
				const apiBody: any = {};
				
				// Only include URL if provided
				if (hasUrl) {
					apiBody.url = screenshotConfig.url;
				}
				if (screenshotConfig.waitTime !== undefined) {
					apiBody.wait = screenshotConfig.waitTime;
				}
				if (screenshotConfig.width !== undefined) {
					apiBody.width = screenshotConfig.width;
				}
				if (screenshotConfig.height !== undefined) {
					apiBody.height = screenshotConfig.height;
				}
				if (screenshotConfig.imageQuality !== undefined) {
					apiBody.image_quality = screenshotConfig.imageQuality;
				}
				if (screenshotConfig.scrollAllContent !== undefined) {
					apiBody.scroll_all_content = screenshotConfig.scrollAllContent;
				}
				if (screenshotConfig.captureFullHeight !== undefined) {
					apiBody.capture_full_height = screenshotConfig.captureFullHeight;
				}
				
				// Debug: Log the request body
				context.logger?.info('Screenshot Tools - Request body: ' + JSON.stringify(apiBody, null, 2));
				context.logger?.info('Screenshot Tools - Making request to: ' + `${baseUrl}/v1/tools/screenshot with sessionId=${sessionId}`);
				
				// Only include sessionId in query string if provided
				const queryParams: any = {};
				if (sessionId && sessionId.trim() !== '') {
					queryParams.sessionId = sessionId;
				}
				
				// Make the request to get binary data - using the same approach as the working test script
				const response = await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/tools/screenshot`,
					qs: queryParams,
					body: apiBody,
					headers: {
						'Accept': 'image/png',
						'X-Client-Source': 'n8n-anchorbrowser-node',
					},
					returnFullResponse: true,
				});
				
				// Debug: Log response info
				context.logger?.info('Screenshot Tools - Response received, status: ' + response.status);
				context.logger?.info('Screenshot Tools - Response body type: ' + typeof response.body);
				
				const binaryData = response.body;
				context.logger?.info('Screenshot Tools - Response body');
								
				// Convert to base64 for n8n binary data structure
				const base64Data = binaryData.toString('base64') || binaryData;
				const fileName = `screenshot-${Date.now()}.png`;
				context.logger?.info('Screenshot Tools - Base64 data length: ' + base64Data.length + ' characters');
				
				const result = {
					json: {
						message: 'Screenshot captured successfully',
						screenshot: base64Data,
						timestamp: new Date().toISOString(),
						format: 'png',
						mimeType: 'image/png',
						fileName: fileName,
					}
				};
				
				context.logger?.info('Screenshot Tools - Returning result with binary data');
				return result;
			}

			default:
				throw new NodeOperationError(context.getNode(), `Unknown tools operation: ${operation}`);
		}
	}

	private static async executeOSControlOperation(context: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
		const sessionId = context.getNodeParameter('sessionId', itemIndex) as string;
		const baseUrl = context.getNodeParameter('baseUrl', itemIndex, 'https://api.anchorbrowser.io') as string;

		// Validate session ID first
		if (!sessionId || sessionId.trim() === '') {
			throw new NodeOperationError(context.getNode(), 'Session ID is required for OS Control operations');
		}

		switch (operation) {
			case 'mouseClick': {
				const mouseClickConfig = context.getNodeParameter('mouseClickConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved mouseClickConfig: ' + JSON.stringify(mouseClickConfig, null, 2));
				
				// Validate required parameters with specific error messages
				if ((mouseClickConfig.x === undefined || mouseClickConfig.x === null) && (mouseClickConfig.y === undefined || mouseClickConfig.y === null)) {
					throw new NodeOperationError(context.getNode(), 'X and Y coordinates are required for mouse click operation');
				}
				if (mouseClickConfig.x === undefined || mouseClickConfig.x === null) {
					throw new NodeOperationError(context.getNode(), 'X coordinate is required for mouse click operation');
				}
				if (mouseClickConfig.y === undefined || mouseClickConfig.y === null) {
					throw new NodeOperationError(context.getNode(), 'Y coordinate is required for mouse click operation');
				}
				
				// Map mouse click configuration to correct API structure
				const body: any = {
					x: mouseClickConfig.x,
					y: mouseClickConfig.y,
				};
				
				if (mouseClickConfig.button !== undefined) {
					body.button = mouseClickConfig.button;
				}
				
				// Debug: Log the request body
				context.logger?.info('Mouse click request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/mouse/click`,
					body,
				});
			}

			case 'mouseDoubleClick': {
				const mouseDoubleClickConfig = context.getNodeParameter('mouseDoubleClickConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved mouseDoubleClickConfig: ' + JSON.stringify(mouseDoubleClickConfig, null, 2));
				
				// Validate required parameters with specific error messages
				if (mouseDoubleClickConfig.x === undefined && mouseDoubleClickConfig.y === undefined) {
					throw new NodeOperationError(context.getNode(), 'X and Y coordinates are required for mouse double click operation');
				}
				if (mouseDoubleClickConfig.x === undefined) {
					throw new NodeOperationError(context.getNode(), 'X coordinate is required for mouse double click operation');
				}
				if (mouseDoubleClickConfig.y === undefined) {
					throw new NodeOperationError(context.getNode(), 'Y coordinate is required for mouse double click operation');
				}
				
				// Map mouse double click configuration to correct API structure
				const body: any = {
					x: mouseDoubleClickConfig.x,
					y: mouseDoubleClickConfig.y,
				};
				
				if (mouseDoubleClickConfig.button !== undefined) {
					body.button = mouseDoubleClickConfig.button;
				}
				
				// Debug: Log the request body
				context.logger?.info('Mouse double click request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/mouse/doubleClick`,
					body,
				});
			}

			case 'mouseMove': {
				const mouseMoveConfig = context.getNodeParameter('mouseMoveConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved mouseMoveConfig: ' + JSON.stringify(mouseMoveConfig, null, 2));
				
				
				// Validate required parameters with specific error messages
				if (mouseMoveConfig.x === undefined && mouseMoveConfig.y === undefined) {
					throw new NodeOperationError(context.getNode(), 'X and Y coordinates are required for mouse move operation');
				}
				if (mouseMoveConfig.x === undefined) {
					throw new NodeOperationError(context.getNode(), 'X coordinate is required for mouse move operation');
				}
				if (mouseMoveConfig.y === undefined) {
					throw new NodeOperationError(context.getNode(), 'Y coordinate is required for mouse move operation');
				}
				
				// Map mouse move configuration to correct API structure
				const body: any = {
					x: mouseMoveConfig.x,
					y: mouseMoveConfig.y,
				};
				
				// Debug: Log the request body
				context.logger?.info('Mouse move request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/mouse/move`,
					body,
				});
			}

			case 'dragDrop': {
				const dragDropConfig = context.getNodeParameter('dragDropConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved dragDropConfig: ' + JSON.stringify(dragDropConfig, null, 2));
				
				// Validate required parameters with specific error messages
				if (dragDropConfig.startX === undefined && dragDropConfig.startY === undefined && 
					dragDropConfig.endX === undefined && dragDropConfig.endY === undefined) {
					throw new NodeOperationError(context.getNode(), 'Start and end coordinates are required for drag and drop operation');
				}
				if (dragDropConfig.startX === undefined) {
					throw new NodeOperationError(context.getNode(), 'Start X coordinate is required for drag and drop operation');
				}
				if (dragDropConfig.startY === undefined) {
					throw new NodeOperationError(context.getNode(), 'Start Y coordinate is required for drag and drop operation');
				}
				if (dragDropConfig.endX === undefined) {
					throw new NodeOperationError(context.getNode(), 'End X coordinate is required for drag and drop operation');
				}
				if (dragDropConfig.endY === undefined) {
					throw new NodeOperationError(context.getNode(), 'End Y coordinate is required for drag and drop operation');
				}
				
				// Map drag and drop configuration to correct API structure
				const body: any = {
					startX: dragDropConfig.startX,
					startY: dragDropConfig.startY,
					endX: dragDropConfig.endX,
					endY: dragDropConfig.endY,
				};
				
				if (dragDropConfig.button !== undefined) {
					body.button = dragDropConfig.button;
				}
				
				// Debug: Log the request body
				context.logger?.info('Drag and drop request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/drag-and-drop`,
					body,
				});
			}

			case 'scroll': {
				const scrollConfig = context.getNodeParameter('scrollConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved scrollConfig: ' + JSON.stringify(scrollConfig, null, 2));
				
				// Validate required parameters with specific error messages
				if (scrollConfig.x === undefined && scrollConfig.y === undefined && scrollConfig.deltaY === undefined) {
					throw new NodeOperationError(context.getNode(), 'X, Y coordinates and deltaY are required for scroll operation');
				}
				if (scrollConfig.x === undefined) {
					throw new NodeOperationError(context.getNode(), 'X coordinate is required for scroll operation');
				}
				if (scrollConfig.y === undefined) {
					throw new NodeOperationError(context.getNode(), 'Y coordinate is required for scroll operation');
				}
				if (scrollConfig.deltaY === undefined) {
					throw new NodeOperationError(context.getNode(), 'DeltaY is required for scroll operation');
				}
				
				// Map scroll configuration to correct API structure
				const body: any = {
					x: scrollConfig.x,
					y: scrollConfig.y,
					deltaY: scrollConfig.deltaY,
				};
				
				// Optional parameters
				if (scrollConfig.deltaX !== undefined) {
					body.deltaX = scrollConfig.deltaX;
				}
				if (scrollConfig.steps !== undefined) {
					body.steps = scrollConfig.steps;
				}
				if (scrollConfig.useOs !== undefined) {
					body.useOs = scrollConfig.useOs;
				}
				
				// Debug: Log the request body
				context.logger?.info('Scroll request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/scroll`,
					body,
				});
			}

			case 'typeText': {
				const typeTextConfig = context.getNodeParameter('typeTextConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved typeTextConfig: ' + JSON.stringify(typeTextConfig, null, 2));
				
				// Validate required parameters
				if (!typeTextConfig.text || typeTextConfig.text.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Text is required for type text operation');
				}
				
				// Map type text configuration to correct API structure
				const body: any = {
					text: typeTextConfig.text,
				};
				
				if (typeTextConfig.delay !== undefined) {
					body.delay = typeTextConfig.delay;
				}
				
				// Debug: Log the request body
				context.logger?.info('Type text request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/keyboard/type`,
					body,
				});
			}

			case 'keyboardShortcut': {
				const keyboardShortcutConfig = context.getNodeParameter('keyboardShortcutConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved keyboardShortcutConfig: ' + JSON.stringify(keyboardShortcutConfig, null, 2));
				
				// Validate required parameters
				if (!keyboardShortcutConfig.keys || keyboardShortcutConfig.keys.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Keys are required for keyboard shortcut operation');
				}
				
				// Map keyboard shortcut configuration to correct API structure
				// Convert comma-separated string to array of strings
				const keysArray = keyboardShortcutConfig.keys
					.split(',')
					.map((key: string) => key.trim())
					.filter((key: string) => key !== '');
				
				const body: any = {
					keys: keysArray,
				};
				
				if (keyboardShortcutConfig.holdTime !== undefined) {
					body.holdTime = keyboardShortcutConfig.holdTime;
				}
				
				// Debug: Log the request body
				context.logger?.info('Keyboard shortcut request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/keyboard/shortcut`,
					body,
				});
			}

			case 'navigate': {
				const navigateConfig = context.getNodeParameter('navigateConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved navigateConfig for navigate: ' + JSON.stringify(navigateConfig, null, 2));
				
				// Validate required parameters
				if (!navigateConfig.url || navigateConfig.url.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'URL is required for navigate operation');
				}
				
				// Map navigate configuration to correct API structure
				const body: any = {
					url: navigateConfig.url,
				};
				
				if (navigateConfig.delay !== undefined) {
					body.delay = navigateConfig.delay;
				}
				
				// Debug: Log the request body
				context.logger?.info('Navigate request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/goto`,
					body,
				});
			}

			case 'getClipboard': {
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/${sessionId}/clipboard`,
				});
			}

			case 'setClipboard': {
				const clipboardConfig = context.getNodeParameter('clipboardConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved clipboardConfig for setClipboard: ' + JSON.stringify(clipboardConfig, null, 2));
				
				// Validate required parameters
				if (!clipboardConfig.text || clipboardConfig.text.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Text is required for set clipboard operation');
				}
				
				// Map clipboard configuration to correct API structure
				const body: any = {
					text: clipboardConfig.text,
				};
				
				// Debug: Log the request body
				context.logger?.info('Set clipboard request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/clipboard`,
					body,
				});
			}

			case 'copyText': {
				const clipboardConfig = context.getNodeParameter('clipboardConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved clipboardConfig for copyText: ' + JSON.stringify(clipboardConfig, null, 2));
				
				// Validate required parameters
				if (!clipboardConfig.text || clipboardConfig.text.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Text is required for copy text operation');
				}
				
				// Map clipboard configuration to correct API structure
				const body: any = {
					text: clipboardConfig.text,
				};
				
				// Debug: Log the request body
				context.logger?.info('Copy text request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/copy`,
					body,
				});
			}

			case 'pasteText': {
				const clipboardConfig = context.getNodeParameter('clipboardConfig', itemIndex, {}) as any;
				
				// Debug: Log the retrieved parameters
				context.logger?.info('Retrieved clipboardConfig for pasteText: ' + JSON.stringify(clipboardConfig, null, 2));
				
				// Validate required parameters
				if (!clipboardConfig.text || clipboardConfig.text.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Text is required for paste text operation');
				}
				
				// Map clipboard configuration to correct API structure
				const body: any = {
					text: clipboardConfig.text,
				};
				
				// Debug: Log the request body
				context.logger?.info('Paste text request body: ' + JSON.stringify(body, null, 2));
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/sessions/${sessionId}/paste`,
					body,
				});
			}

			case 'screenshot': {
				// Debug: Log the operation start
				context.logger?.info('Screenshot OS Control - Starting screenshot operation for session: ' + sessionId);
				context.logger?.info('Screenshot OS Control - Making request to: ' + `${baseUrl}/v1/sessions/${sessionId}/screenshot`);
				
				// Make the request to get binary data - using the same approach as the working test script
				const response = await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/sessions/${sessionId}/screenshot`,
					headers: {
						'Accept': 'image/png',
						'X-Client-Source': 'n8n-anchorbrowser-node',
					},
					returnFullResponse: true,
				});
				
				// Debug: Log response info
				context.logger?.info('Screenshot OS Control - Response received, status: ' + response.status);
				context.logger?.info('Screenshot OS Control - Response body type: ' + typeof response.body);
				
				// Handle the response like the working test script: arrayBuffer() -> Buffer.from()
				const binaryData = response.body;
				context.logger?.info('Screenshot OS Control - Response body');
				
				const fileName = `screenshot-${Date.now()}.png`;
				const base64Data = binaryData.toString('base64') || binaryData;
				context.logger?.info('Screenshot OS Control - Base64 data length: ' + base64Data.length + ' characters');
				
				const result: any = {
					json: {
						message: 'Screenshot captured successfully',
						screenshot: base64Data,
						timestamp: new Date().toISOString(),
						format: 'png',
						mimeType: 'image/png',
						fileName: fileName,
					}
				};
				
				context.logger?.info('Screenshot OS Control - Returning result with binary data');
				return result;
			}

			default:
				throw new NodeOperationError(context.getNode(), `Unknown OS control operation: ${operation}`);
		}
	}

	private static async executeTaskOperation(context: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
		const baseUrl = context.getNodeParameter('baseUrl', itemIndex, 'https://api.anchorbrowser.io') as string;

		switch (operation) {
			case 'create': {
				const createTaskConfig = context.getNodeParameter('createTaskConfig', itemIndex, {}) as any;
				
				// Validate required parameters
				if (!createTaskConfig.name || createTaskConfig.name.trim() === '') {
					throw new NodeOperationError(context.getNode(), 'Task name is required for create task operation');
				}
				
				// Map task configuration to correct API structure
				const body: any = {
					name: createTaskConfig.name,
					language: createTaskConfig.language || 'typescript',
				};
				
				if (createTaskConfig.description !== undefined) {
					body.description = createTaskConfig.description;
				}
				if (createTaskConfig.code !== undefined) {
					body.code = createTaskConfig.code;
				}
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/task`,
					body,
				});
			}

			case 'list': {
				const listTasksConfig = context.getNodeParameter('listTasksConfig', itemIndex, {}) as any;
				const page = listTasksConfig.page || '1';
				const limit = listTasksConfig.limit || '10';
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: `${baseUrl}/v1/task`,
					qs: { page, limit },
				});
			}

			case 'delete': {
				const taskId = context.getNodeParameter('taskId', itemIndex) as string;
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'DELETE',
					url: `${baseUrl}/v1/task/${taskId}`,
				});
			}

			case 'run': {
				const taskId = context.getNodeParameter('taskId', itemIndex) as string;
				const runTaskConfig = context.getNodeParameter('runTaskConfig', itemIndex, {}) as any;
				
				// Map run task configuration to correct API structure
				const body: any = {
					taskId: taskId,
				};
				
				if (runTaskConfig.version !== undefined) {
					body.version = runTaskConfig.version;
				}
				if (runTaskConfig.sessionId !== undefined) {
					body.sessionId = runTaskConfig.sessionId;
				}
				if (runTaskConfig.taskSessionId !== undefined) {
					body.taskSessionId = runTaskConfig.taskSessionId;
				}
				if (runTaskConfig.inputs !== undefined) {
					// Parse JSON if it's a string
					let inputs = runTaskConfig.inputs;
					if (typeof inputs === 'string') {
						try {
							inputs = JSON.parse(inputs);
						} catch (e) {
							throw new NodeOperationError(context.getNode(), 'Invalid JSON in Inputs: ' + e.message);
						}
					}
					body.inputs = inputs;
				}
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/task/run`,
					body,
				});
				
			}

			case 'deploy': {
				const taskId = context.getNodeParameter('taskId', itemIndex) as string;
				const deployTaskConfig = context.getNodeParameter('deployTaskConfig', itemIndex, {}) as any;
				
				// Map deploy task configuration to correct API structure
				const body: any = {};
				
				if (deployTaskConfig.code !== undefined) {
					body.code = deployTaskConfig.code;
				}
				if (deployTaskConfig.language !== undefined) {
					body.language = deployTaskConfig.language;
				}
				if (deployTaskConfig.description !== undefined) {
					body.description = deployTaskConfig.description;
				}
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'POST',
					url: `${baseUrl}/v1/task/${taskId}/deploy`,
					body,
				});
			}

			case 'listExecutions': {
				const taskId = context.getNodeParameter('taskId', itemIndex) as string;
				const listExecutionsConfig = context.getNodeParameter('listExecutionsConfig', itemIndex, {}) as any;
				
				// Build query parameters
				const qs: any = {
					page: listExecutionsConfig.page || '1',
					limit: listExecutionsConfig.limit || '10',
				};
				
				// Only add status if it's a non-empty string
				if (listExecutionsConfig.status && listExecutionsConfig.status.trim() !== '') {
					qs.status = listExecutionsConfig.status;
				}
				// Only add version if it's a non-empty string
				if (listExecutionsConfig.version && listExecutionsConfig.version.trim() !== '') {
					qs.version = listExecutionsConfig.version;
				}
				
				const fullUrl = `${baseUrl}/v1/task/${taskId}/executions`;
				
				return await context.helpers.httpRequestWithAuthentication.call(context, 'anchorBrowserApi', {
					method: 'GET',
					url: fullUrl,
					qs,
				});
			}

			default:
				throw new NodeOperationError(context.getNode(), `Unknown task operation: ${operation}`);
		}
	}

}
