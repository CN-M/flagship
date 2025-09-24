import {
	BarChart3,
	Code,
	Database,
	ExternalLink,
	Github,
	Globe,
	Shield,
	Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="border-b border-border/40">
				<div className="max-w-6xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
								<Zap className="w-4 h-4 text-primary-foreground" />
							</div>
							<span className="text-xl font-semibold text-foreground">
								flagship
							</span>
						</div>
						<div className="flex items-center gap-6">
							<a
								href="#features"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Features
							</a>
							<a
								href="#installation"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Installation
							</a>
							<a
								href="#roadmap"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Roadmap
							</a>
							<a
								href="#contact"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<Badge variant="secondary" className="mb-4">
							Portfolio Project
						</Badge>
						<h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
							flagship
						</h1>
						<p className="text-xl text-muted-foreground mb-4 leading-relaxed">
							Feature Flag SDK
						</p>
						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
							A comprehensive feature flag management system built with modern
							web technologies. Includes a REST API, web dashboard, and
							JavaScript SDK for seamless feature rollouts and A/B testing in
							production applications.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button size="lg" className="gap-2">
								<Github className="w-4 h-4" />
								View on GitHub
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="gap-2 bg-transparent"
							>
								<ExternalLink className="w-4 h-4" />
								Live Demo
							</Button>
						</div>
					</div>
					<div className="relative">
						<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
							<div className="space-y-4">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<span>Installation</span>
								</div>
								<div className="bg-muted/50 rounded-md p-4 font-mono text-sm">
									<span className="text-muted-foreground">$</span> npm i
									@cn-m/flagship
								</div>
								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm">
										<Code className="w-4 h-4 text-primary" />
										<span>JavaScript SDK</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Database className="w-4 h-4 text-primary" />
										<span>REST API</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<BarChart3 className="w-4 h-4 text-primary" />
										<span>Web Dashboard</span>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="max-w-6xl mx-auto px-6 py-20">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Complete Feature Flag Solution
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Built from the ground up with scalability and developer experience
						in mind.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
							<Code className="w-6 h-6 text-primary" />
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">
							JavaScript SDK
						</h3>
						<p className="text-muted-foreground mb-4">
							Lightweight client library with TypeScript support, real-time
							updates, and zero dependencies.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>TypeScript support</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>Real-time flag updates</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>Zero dependencies</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
							<Database className="w-6 h-6 text-primary" />
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">
							REST API
						</h3>
						<p className="text-muted-foreground mb-4">
							Robust backend API with authentication, rate limiting, and
							comprehensive flag management endpoints.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>JWT authentication</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>Rate limiting</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>OpenAPI documentation</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
							<BarChart3 className="w-6 h-6 text-primary" />
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">
							Web Dashboard
						</h3>
						<p className="text-muted-foreground mb-4">
							Intuitive web interface for managing flags, viewing analytics, and
							controlling feature rollouts.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>Real-time analytics</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>User targeting</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
								<span>A/B testing tools</span>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* Technical Details */}
			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="grid lg:grid-cols-2 gap-12">
					<div>
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Technical Implementation
						</h2>
						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
							Built with modern technologies and best practices, showcasing
							full-stack development capabilities and system design skills.
						</p>
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
									<Shield className="w-4 h-4 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground mb-2">
										Security First
									</h3>
									<p className="text-muted-foreground">
										Implements JWT authentication, input validation, and secure
										API design patterns.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
									<Globe className="w-4 h-4 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-foreground mb-2">
										Production Ready
									</h3>
									<p className="text-muted-foreground">
										Includes error handling, logging, monitoring, and deployment
										configurations.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
							<h3 className="text-xl font-semibold text-foreground mb-4">
								Tech Stack
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="font-medium text-foreground mb-2">Backend</h4>
									<div className="space-y-1 text-sm text-muted-foreground">
										<div>Node.js</div>
										<div>Express.js</div>
										<div>PostgreSQL</div>
										<div>Redis</div>
									</div>
								</div>
								<div>
									<h4 className="font-medium text-foreground mb-2">Frontend</h4>
									<div className="space-y-1 text-sm text-muted-foreground">
										<div>React</div>
										<div>TypeScript</div>
										<div>Tailwind CSS</div>
										<div>Vite</div>
									</div>
								</div>
								<div>
									<h4 className="font-medium text-foreground mb-2">DevOps</h4>
									<div className="space-y-1 text-sm text-muted-foreground">
										<div>Docker</div>
										<div>GitHub Actions</div>
										<div>AWS/Vercel</div>
										<div>Monitoring</div>
									</div>
								</div>
								<div>
									<h4 className="font-medium text-foreground mb-2">Testing</h4>
									<div className="space-y-1 text-sm text-muted-foreground">
										<div>Jest</div>
										<div>Supertest</div>
										<div>Cypress</div>
										<div>Unit & E2E</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Installation Section */}
			<section id="installation" className="max-w-6xl mx-auto px-6 py-20">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Quick Start
					</h2>
					<p className="text-lg text-muted-foreground">
						Get started with flagship in minutes
					</p>
				</div>

				<Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 max-w-3xl mx-auto">
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-3">
								1. Install the SDK
							</h3>
							<div className="bg-muted/50 rounded-md p-4 font-mono text-sm">
								npm install @cn-m/flagship
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-3">
								2. Initialize the client
							</h3>
							<div className="bg-muted/50 rounded-md p-4 font-mono text-sm">
								<div className="text-muted-foreground">
									{'import { FlagshipClient } from "@cn-m/flagship";'}
								</div>
								<div className="mt-2">
									{"const client = new FlagshipClient({"}
								</div>
								<div className="ml-4 text-muted-foreground">
									{'apiKey: "your-api-key",'}
								</div>
								<div className="ml-4 text-muted-foreground">
									{'environment: "production"'}
								</div>
								<div>{"});"}</div>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-3">
								3. Use feature flags
							</h3>
							<div className="bg-muted/50 rounded-md p-4 font-mono text-sm">
								<div className="text-muted-foreground">
									{'const isEnabled = await client.getFlag("new-feature");'}
								</div>
								<div className="mt-2">{"if (isEnabled) {"}</div>
								<div className="ml-4 text-muted-foreground">
									{"// Show new feature"}
								</div>
								<div>{"}"}</div>
							</div>
						</div>
					</div>
				</Card>
			</section>

			{/* Roadmap Section */}
			<section id="roadmap" className="max-w-6xl mx-auto px-6 py-20">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Development Roadmap
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Planned features and improvements to enhance the flagship ecosystem
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="default"
								className="bg-green-500/10 text-green-500 border-green-500/20"
							>
								In Progress
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							Multi-Environment Support
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Enhanced environment management with staging, development, and
							production flag isolation.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Environment-specific configurations</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Promotion workflows</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="secondary"
								className="bg-blue-500/10 text-blue-500 border-blue-500/20"
							>
								Planned
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							Advanced Analytics
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Comprehensive analytics dashboard with conversion tracking and
							performance metrics.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Conversion funnel analysis</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Statistical significance testing</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="secondary"
								className="bg-blue-500/10 text-blue-500 border-blue-500/20"
							>
								Planned
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							SDK Expansion
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Multi-language SDK support for Python, Go, and mobile platforms.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Python SDK</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>React Native SDK</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="secondary"
								className="bg-purple-500/10 text-purple-500 border-purple-500/20"
							>
								Future
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							Machine Learning
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							AI-powered flag optimization and automated rollout
							recommendations.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Predictive rollout analysis</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Anomaly detection</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="secondary"
								className="bg-purple-500/10 text-purple-500 border-purple-500/20"
							>
								Future
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							Enterprise Features
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Advanced security, compliance, and team management capabilities.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>SSO integration</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Audit logging</span>
							</div>
						</div>
					</Card>

					<Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
						<div className="flex items-center gap-3 mb-4">
							<Badge
								variant="secondary"
								className="bg-orange-500/10 text-orange-500 border-orange-500/20"
							>
								Research
							</Badge>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-3">
							Edge Computing
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Edge-deployed flag evaluation for ultra-low latency feature
							toggles.
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>CDN integration</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span>Global flag synchronization</span>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="max-w-6xl mx-auto px-6 py-20">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Get In Touch
					</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Interested in discussing this project or exploring collaboration
						opportunities? I'd love to hear from you.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="gap-2">
							<Github className="w-4 h-4" />
							GitHub Profile
						</Button>
						<Button variant="outline" size="lg">
							Download Resume
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border/40 mt-20">
				<div className="max-w-6xl mx-auto px-6 py-8">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
								<Zap className="w-3 h-3 text-primary-foreground" />
							</div>
							<span className="text-foreground font-medium">flagship</span>
						</div>
						<div className="text-sm text-muted-foreground">Ntsako Mbhalati</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
