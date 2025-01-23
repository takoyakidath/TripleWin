'use strict';

import { Bot, Friend } from '@/components/game';

export default async function Page({ params }: { params: Promise<{ mode: string }> }) {
    const { mode } = await params;
    return <div>{mode === 'bot' ? <Bot /> : <Friend />}</div>;
}