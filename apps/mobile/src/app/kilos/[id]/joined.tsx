import { KiloNotFound } from '@/components/kilo-not-found';
import { useKiloParam } from '@/hooks/use-kilo-param';
import { KiloJoined } from '@/screens/kilo-joined';

export default function JoinedKiloScreen() {
  const kilo = useKiloParam();
  if (!kilo) return <KiloNotFound />;
  return <KiloJoined kilo={kilo} />;
}
