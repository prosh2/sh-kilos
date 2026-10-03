import { KiloNotFound } from '@/components/kilo-not-found';
import { useKiloParam } from '@/hooks/use-kilo-param';
import { KiloChat } from '@/screens/kilo-chat';

export default function KiloChatScreen() {
  const kilo = useKiloParam();
  if (!kilo) return <KiloNotFound />;
  return <KiloChat kilo={kilo} />;
}
