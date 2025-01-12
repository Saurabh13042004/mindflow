import { 
  Brain, 
  GitBranch, 
  Sparkles, 
  Users, 
  Palette, 
  StickyNote, 
  Check, 
  ArrowRight,
  Zap,
  Share2,
  Lightbulb,
  Layers,
  MessageSquare,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom';
import React from 'react'

const features = [
  {
    icon: GitBranch,
    title: 'Intuitive Mind Mapping',
    description: 'Create and organize your thoughts with our powerful mind mapping tools',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Creation',
    description: 'Generate mind maps automatically using advanced AI technology',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Collaborate seamlessly with team members using granular access controls',
  },
  {
    icon: Palette,
    title: 'Customizable Nodes',
    description: 'Design your mind maps exactly how you want with customizable nodes',
  },
  {
    icon: StickyNote,
    title: 'Sticky Notes',
    description: 'Add context and details with integrated sticky notes',
  },
  {
    icon: Share2,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time on shared mind maps',
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    quote: 'MindFlow has transformed how our team brainstorms and plans features. The AI suggestions are incredibly helpful.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Creative Director',
    company: 'Design Studio',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    quote: 'The customization options and real-time collaboration features make MindFlow an essential tool for our creative process.',
  },
  {
    name: 'Emily Thompson',
    role: 'Research Lead',
    company: 'Innovation Labs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    quote: 'As a researcher, I love how MindFlow helps me organize complex information and share it with my team.',
  }
];

const integrations = [
  'Slack', 'Google Drive', 'Microsoft Teams', 'Trello', 'Asana', 'Notion', 'Jira',
];

const benefits = [
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with your team, seeing changes instantly',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent suggestions to expand your mind maps effortlessly',
  },
  {
    icon: Layers,
    title: 'Unlimited Freedom',
    description: 'Create without limits using our flexible and powerful tools',
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold">MindFlow</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
              <a href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className='text-white'>Try Beta</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Think, visualize, and collaborate
              <span className="text-blue-600"> all in one canvas</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your ideas into clear visual maps and boost team creativity.
              Collaborate in real-time and leverage AI to enhance your workflow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-lg text-white">
                Try Beta - It's Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Watch Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              ✨ Free during beta period
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-border/50"
          >
            <img
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80"
              alt="MindFlow Interface"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Solve your team's creative challenges</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlock your team's potential with powerful collaboration and AI-driven insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need for visual thinking</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to help you organize thoughts and boost creativity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card shadow-lg border border-border/50 hover:border-border transition-colors"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Join the creators and innovators</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how teams are using MindFlow to transform their creative process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Connect with tools you use every day</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Seamlessly integrate MindFlow with your favorite productivity tools
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg px-6 py-3 shadow-sm border border-border/50"
              >
                {integration}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our beta program and get access to all premium features
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Beta Access</h3>
                <span className="text-blue-600 font-semibold">Free</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Get early access to all features during our beta phase
              </p>
              <Button className="w-full mb-6">Join Beta Now</Button>
              <ul className="space-y-3">
                {[
                  'Unlimited mind maps',
                  'AI-powered generation',
                  'Real-time collaboration',
                  'Custom themes',
                  'Priority support',
                  'Early adopter benefits',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-semibold">MindFlow</span>
              </div>
              <p className="text-muted-foreground">
                Stay organized and boost your creativity
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Templates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Integrations</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Beta Program</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground">
                © 2024 MindFlow. All rights reserved.
              </div>
              <div className="text-sm text-muted-foreground">
                Currently in Beta • Made with ❤️
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}