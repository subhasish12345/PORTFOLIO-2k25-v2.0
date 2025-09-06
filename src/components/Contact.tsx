import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter, MessageSquare, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export default function Contact() {

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <h2 className="text-4xl font-bold">Get In Touch</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            🚀 Ready to collaborate on innovative projects? Let's discuss how we can build the
            future together with cutting-edge technology and creative solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card className="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cyan-400 font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">subahsishnayak38@gmail.com</p>
                    <p className="text-xs text-muted-foreground">Best way to reach me</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-400 font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 7750096113</p>
                    <p className="text-xs text-muted-foreground">Available 10 AM to 8 PM IST</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-purple-400 font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Bhubaneswar, Odisha, India</p>
                    <p className="text-xs text-muted-foreground">Open to remote opportunities</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Clock className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-orange-400 font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">&lt; 24 hours</p>
                    <p className="text-xs text-muted-foreground">Typical response time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connect With Me Card */}
            <Card className="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-400" />
                  Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="https://github.com/subhasish12345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-gray-500/10 transition-colors">
                  <div className="p-2 rounded-lg bg-gray-500/20">
                    <Github className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">@subhasish12345</p>
                    <p className="text-xs text-muted-foreground">Code repositories & projects</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/subhasish-nayak-67a257280/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-blue-500/10 transition-colors">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-400 font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Subhasish Nayak</p>
                    <p className="text-xs text-muted-foreground">Professional network</p>
                  </div>
                </a>

                <a href="https://www.instagram.com/subhasish_nayak_?igsh=OXF2ODZscGc1dzRw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-pink-500/10 transition-colors">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-pink-400 font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">@subhasish_nayak_</p>
                    <p className="text-xs text-muted-foreground">Daily updates & behind the scenes</p>
                  </div>
                </a>

                <a href="https://x.com/Subhunew1Nayak?t=etWteaHNxNcUim6I600csQ&s=09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-sky-500/10 transition-colors">
                  <div className="p-2 rounded-lg bg-sky-500/20">
                    <Twitter className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-sky-400 font-medium">Twitter</p>
                    <p className="text-sm text-sky-400 font-medium">X (Twitter)</p>
                    <p className="text-sm text-muted-foreground">@Subhunew1Nayak</p>
                    <p className="text-xs text-muted-foreground">Tech updates & thoughts</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Current Availability Card */}
            <Card className="glass">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Current Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Internship Opportunities</span>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Freelance Projects</span>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collaboration</span>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Open</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Full-time Roles (2025)</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Interested</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400">
                    📅 Currently in final year of CSE. Available for part-time work and exciting full-time 
                    opportunities post-graduation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="glass">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">SUBHASISH NAYAK</h3>
              <p className="text-muted-foreground mb-4">
                🚀 Building the Future with Code | 🤖 Android Developer | 🧠 AI/ML Enthusiast
              </p>
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white">
                MEET THE NANITES
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Built with ❤️ by SUBHASISH NAYAK &copy; 2025
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}