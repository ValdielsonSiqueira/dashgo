import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboard2Line, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboard2Line}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiContactsLine}>
          Usuários
        </NavLink>
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink href="/forms" icon={RiInputMethodLine}>
            Formulários
          </NavLink>
          <NavLink href="/automation" icon={RiGitMergeLine}>
            Automação
          </NavLink>
        </Stack>
      </NavSection>
    </Stack>
  );
}