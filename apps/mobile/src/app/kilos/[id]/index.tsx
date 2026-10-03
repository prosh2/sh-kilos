import { KiloNotFound } from '@/components/kilo-not-found';
import { useKiloParam } from '@/hooks/use-kilo-param';
import { KiloDetails } from '@/screens/kilo-details';

export default function KiloDetailsScreen() {
  const kilo = useKiloParam();
  if (!kilo) return <KiloNotFound />;
  return <KiloDetails kilo={kilo} />;
}
