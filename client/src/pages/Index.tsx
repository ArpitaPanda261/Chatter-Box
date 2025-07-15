import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: 'Real-time Messaging',
      description: 'Send and receive messages instantly with our lightning-fast chat system.',
    },
    {
      icon: Users,
      title: 'Group Conversations',
      description: 'Create group chats and collaborate with teams effortlessly.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are protected with end-to-end encryption.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern technology for the smoothest experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-chat">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            ChatApp
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with friends, family, and colleagues through our modern, 
            secure, and lightning-fast messaging platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate(ROUTES.LOGIN)}
              variant="outline"
              className="text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ChatApp?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to get started?</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Join thousands of users already chatting on ChatApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate(ROUTES.SIGNUP)}
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
