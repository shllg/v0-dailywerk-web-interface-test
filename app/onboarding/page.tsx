'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { useAgents } from '@/contexts/agent-context';
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';
import { WelcomeStep } from '@/components/onboarding/steps/welcome-step';
import { CreateAgentStep } from '@/components/onboarding/steps/create-agent-step';
import { ChooseToolsStep } from '@/components/onboarding/steps/choose-tools-step';
import { ConnectGatewayStep } from '@/components/onboarding/steps/connect-gateway-step';
import { CompleteStep } from '@/components/onboarding/steps/complete-step';
import { agentTemplates, availableTools } from '@/lib/mock-data';
import type { Agent } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { onboarding, updateOnboarding, completeOnboarding } = useUser();
  const { addAgent, agents } = useAgents();
  
  const [userName, setUserName] = useState(onboarding.userName || '');
  const [selectedTemplateId, setSelectedTemplateId] = useState(onboarding.selectedTemplateId || 'general-assistant');
  const [agentName, setAgentName] = useState('Atlas');
  const [selectedTools, setSelectedTools] = useState<string[]>(onboarding.selectedTools || ['web-search', 'reminders', 'todos']);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const handleNext = () => {
    updateOnboarding({
      currentStep: onboarding.currentStep + 1,
      userName,
      selectedTemplateId,
      selectedTools,
    });
  };

  const handleBack = () => {
    updateOnboarding({
      currentStep: Math.max(0, onboarding.currentStep - 1),
    });
  };

  const handleComplete = () => {
    // Create the main agent if it doesn't exist
    const mainAgentExists = agents.some(a => a.isMain);
    if (!mainAgentExists) {
      const template = agentTemplates.find(t => t.id === selectedTemplateId);
      const newAgent: Agent = {
        id: 'main-agent',
        name: agentName,
        description: template?.description || 'Your main assistant',
        templateId: selectedTemplateId,
        isMain: true,
        isConfidential: false,
        systemPrompt: template?.defaultPrompt || '',
        tools: selectedTools,
        knowledgePaths: [],
        createdAt: new Date(),
        lastUsedAt: new Date(),
        status: 'online',
      };
      addAgent(newAgent);
    }
    
    completeOnboarding();
    router.push('/onboarding/tour');
  };

  const handleSkipTour = () => {
    const mainAgentExists = agents.some(a => a.isMain);
    if (!mainAgentExists) {
      const template = agentTemplates.find(t => t.id === selectedTemplateId);
      const newAgent: Agent = {
        id: 'main-agent',
        name: agentName,
        description: template?.description || 'Your main assistant',
        templateId: selectedTemplateId,
        isMain: true,
        isConfidential: false,
        systemPrompt: template?.defaultPrompt || '',
        tools: selectedTools,
        knowledgePaths: [],
        createdAt: new Date(),
        lastUsedAt: new Date(),
        status: 'online',
      };
      addAgent(newAgent);
    }
    
    completeOnboarding();
    router.push('/chat');
  };

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome',
      content: (
        <WelcomeStep
          userName={userName}
          onUserNameChange={setUserName}
        />
      ),
    },
    {
      id: 'create-agent',
      title: 'Create Agent',
      content: (
        <CreateAgentStep
          templates={agentTemplates}
          selectedTemplateId={selectedTemplateId}
          onTemplateSelect={setSelectedTemplateId}
          agentName={agentName}
          onAgentNameChange={setAgentName}
        />
      ),
    },
    {
      id: 'choose-tools',
      title: 'Choose Tools',
      content: (
        <ChooseToolsStep
          tools={availableTools}
          selectedTools={selectedTools}
          onToolsChange={setSelectedTools}
        />
      ),
    },
    {
      id: 'connect-gateway',
      title: 'Connect Gateway',
      content: (
        <ConnectGatewayStep
          selectedGateway={selectedGateway}
          onGatewaySelect={setSelectedGateway}
        />
      ),
    },
    {
      id: 'complete',
      title: 'Complete',
      content: (
        <CompleteStep
          userName={userName}
          agentName={agentName}
          toolCount={selectedTools.length}
          gatewayConnected={!!selectedGateway}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <OnboardingWizard
        steps={steps}
        currentStep={onboarding.currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onComplete={handleComplete}
        onSkip={handleSkipTour}
      />
    </div>
  );
}
