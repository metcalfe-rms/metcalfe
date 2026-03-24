import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Crosshair,
  FileStack,
  FolderKanban,
  FolderPlus,
  LifeBuoy,
  LayoutDashboard,
  LogOut,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  match?: string[];
  description?: string;
};

export type WorkflowStep = {
  label: string;
  href: string;
  description: string;
};

export type ProjectSummary = {
  id: string;
  name: string;
  location: string;
  status: "Live" | "Pending" | "Needs Attention";
  phase: string;
  progress: number;
  cameras: number;
  teamSize: number;
  updatedAt: string;
  access: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  permission: string;
  status: "Active" | "Pending" | "Limited";
  zone: string;
};

export type RequestItem = {
  id: string;
  title: string;
  requester: string;
  status: "Pending" | "Approved" | "Needs Review";
  type: string;
  submittedAt: string;
  summary: string;
};

export type ProfileSettings = {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  office: string;
  timezone: string;
  accessLevel: string;
  alerts: string[];
};

export const workspacePrimaryNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and project health",
  },
  {
    label: "Project Access",
    href: "/projects/access-gate",
    icon: FolderPlus,
    match: ["/projects", "/requests/admin-join"],
    description: "Create, join, and manage projects",
  },
  {
    label: "Team",
    href: "/team",
    icon: Users,
    match: ["/team"],
    description: "People, invites, and request box",
  },
  {
    label: "Missions",
    href: "/missions",
    icon: Crosshair,
    match: ["/missions"],
    description: "Operational workflows and readiness",
  },
  {
    label: "Settings",
    href: "/settings/profile",
    icon: ShieldCheck,
    match: ["/settings"],
    description: "Profile, access, and account actions",
  },
];

export const workspaceSecondaryNav: NavItem[] = [
  {
    label: "Support",
    href: "/support",
    icon: LifeBuoy,
    description: "Help desk and escalation routes",
  },
  {
    label: "Privacy",
    href: "/privacy-policy",
    icon: ScrollText,
    description: "Policy, data retention, and controls",
  },
  {
    label: "Utilities",
    href: "/utility-pages",
    icon: FileStack,
    match: ["/utility-pages"],
    description: "Grouped utility and redundant pages",
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOut,
    match: ["/logout"],
    description: "Safe sign-out flow",
  },
];

export const dashboardStats = [
  {
    label: "Live cameras",
    value: "18",
    detail: "4 active sites with health above 96%",
    href: "/projects/access-gate",
  },
  {
    label: "Open requests",
    value: "12",
    detail: "Join approvals, invites, and access changes",
    href: "/team/request-box",
  },
  {
    label: "Verified accounts",
    value: "93%",
    detail: "Current onboarding completion across stakeholders",
    href: "/orientation/account-verification",
  },
  {
    label: "Mission readiness",
    value: "4/5",
    detail: "One site still needs camera placement confirmation",
    href: "/missions",
  },
];

export const projects: ProjectSummary[] = [
  {
    id: "lagos-tower",
    name: "Lagos Tower One",
    location: "Victoria Island, Lagos",
    status: "Live",
    phase: "Finishing and MEP validation",
    progress: 84,
    cameras: 6,
    teamSize: 11,
    updatedAt: "12 minutes ago",
    access: "Admin approved",
  },
  {
    id: "accra-estate",
    name: "Accra Hills Estate",
    location: "East Legon, Accra",
    status: "Pending",
    phase: "Foundation and perimeter security",
    progress: 42,
    cameras: 4,
    teamSize: 8,
    updatedAt: "1 hour ago",
    access: "Verification in review",
  },
  {
    id: "ibadan-campus",
    name: "Ibadan Health Campus",
    location: "Jericho, Ibadan",
    status: "Needs Attention",
    phase: "Night monitoring and crane relocation",
    progress: 63,
    cameras: 8,
    teamSize: 15,
    updatedAt: "5 minutes ago",
    access: "Admin escalation required",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "amina-j",
    name: "Amina James",
    role: "Project Administrator",
    permission: "Full control",
    status: "Active",
    zone: "All projects",
  },
  {
    id: "oliver-k",
    name: "Oliver Koomson",
    role: "Site Supervisor",
    permission: "Camera and incident updates",
    status: "Active",
    zone: "Lagos Tower One",
  },
  {
    id: "adena-k",
    name: "Adena Kim",
    role: "Investor Representative",
    permission: "Read-only with alerts",
    status: "Pending",
    zone: "Accra Hills Estate",
  },
  {
    id: "samir-a",
    name: "Samir Adeyemi",
    role: "Security Lead",
    permission: "Access control and patrol logs",
    status: "Limited",
    zone: "Ibadan Health Campus",
  },
];

export const requestItems: RequestItem[] = [
  {
    id: "req-01",
    title: "Join live project",
    requester: "Adena Kim",
    status: "Pending",
    type: "Project access",
    submittedAt: "Today, 09:20",
    summary: "Investor team member needs read-only access to Accra Hills Estate.",
  },
  {
    id: "req-02",
    title: "Add emergency camera",
    requester: "Oliver Koomson",
    status: "Needs Review",
    type: "Hardware request",
    submittedAt: "Today, 08:05",
    summary: "Night shift requested an extra gate camera after a visibility incident.",
  },
  {
    id: "req-03",
    title: "Permission update",
    requester: "Amina James",
    status: "Approved",
    type: "Team permissions",
    submittedAt: "Yesterday",
    summary: "Expanded Samir's patrol access for the crane corridor zone.",
  },
];

export const profileSettings: ProfileSettings = {
  fullName: "Amina James",
  email: "amina.james@metcalfe.co",
  role: "Operations Administrator",
  phone: "+233 20 555 8201",
  office: "Accra Command Centre",
  timezone: "Africa/Accra",
  accessLevel: "Organisation administrator",
  alerts: [
    "Daily project summaries",
    "High-priority camera incidents",
    "Permission and invite changes",
  ],
};

export const orientationSteps: WorkflowStep[] = [
  {
    label: "Welcome",
    href: "/orientation/welcome",
    description: "Get the platform overview and first-run guidance.",
  },
  {
    label: "Account verification",
    href: "/orientation/account-verification",
    description: "Match role-based verification requirements to access level.",
  },
  {
    label: "System readiness",
    href: "/orientation/system-readiness",
    description: "Check device, security, and notification readiness.",
  },
  {
    label: "Complete",
    href: "/orientation/complete",
    description: "Finish onboarding and continue to project access.",
  },
];

export const createProjectSteps: WorkflowStep[] = [
  {
    label: "Details",
    href: "/projects/create/details",
    description: "Define the project profile, scope, and site identity.",
  },
  {
    label: "Team",
    href: "/projects/create/team",
    description: "Assign owners, approvers, and monitoring contacts.",
  },
  {
    label: "Cameras",
    href: "/projects/create/cameras",
    description: "Choose camera coverage and readiness requirements.",
  },
  {
    label: "Review",
    href: "/projects/create/review",
    description: "Confirm launch settings before creating the project.",
  },
  {
    label: "Success",
    href: "/projects/create/success",
    description: "Project created and ready for the dashboard.",
  },
];

export const joinProjectSteps: WorkflowStep[] = [
  {
    label: "Search",
    href: "/projects/join/search",
    description: "Find the project or invitation you need.",
  },
  {
    label: "Request",
    href: "/projects/join/request",
    description: "Submit your access reason and intended permission level.",
  },
  {
    label: "Status",
    href: "/projects/join/status",
    description: "Track approval status and next actions.",
  },
];

export const adminJoinSteps: WorkflowStep[] = [
  {
    label: "Request",
    href: "/requests/admin-join/request",
    description: "Escalate to the account administrator for project access.",
  },
  {
    label: "Submitted",
    href: "/requests/admin-join/submitted",
    description: "Confirmation and follow-up timing.",
  },
];

export const addCameraSteps: WorkflowStep[] = [
  {
    label: "Device",
    href: "",
    description: "Select the camera unit and installation package.",
  },
  {
    label: "Placement",
    href: "",
    description: "Choose coverage zones, alerts, and mounting position.",
  },
  {
    label: "Review",
    href: "",
    description: "Confirm the install plan before deployment.",
  },
];

export const missionCards = [
  {
    title: "Launch a new monitored site",
    description: "Move from access gate to a verified, camera-ready project setup.",
    href: "/projects/create/details",
    icon: FolderKanban,
  },
  {
    title: "Stabilise system readiness",
    description: "Resolve device, alert, and verification blockers before go-live.",
    href: "/orientation/system-readiness",
    icon: ShieldCheck,
  },
  {
    title: "Expand site visibility",
    description: "Add cameras, update project records, and improve overnight coverage.",
    href: "/projects/lagos-tower/add-camera/device",
    icon: Camera,
  },
  {
    title: "Coordinate access and permissions",
    description: "Invite people, review request boxes, and keep roles accurate.",
    href: "/team",
    icon: Users,
  },
];

export const utilityLinks = [
  {
    title: "Request box",
    description: "Central queue for access changes, hardware requests, and escalations.",
    href: "/team/request-box",
  },
  {
    title: "Empty-state dashboard",
    description: "Preview the pre-project dashboard experience for new accounts.",
    href: "/dashboard/empty",
  },
  {
    title: "Profile and access controls",
    description: "Jump directly into profile, privacy, and permission maintenance.",
    href: "/settings/profile",
  },
  {
    title: "Policy and support",
    description: "Reach the support desk or privacy documentation quickly.",
    href: "/support",
  },
];

export const supportChannels = [
  {
    title: "Launch support desk",
    description: "Workflow and routing help for onboarding, join requests, and account recovery.",
    hours: "24/7 response for platform blockers",
    href: "/projects/access-gate",
  },
  {
    title: "Security operations",
    description: "Camera provisioning, access escalations, and verification assistance.",
    hours: "Priority triage within 15 minutes",
    href: "/settings/access",
  },
  {
    title: "Mission readiness team",
    description: "Deployment planning, readiness checks, and stakeholder coordination.",
    hours: "Business hours with scheduled check-ins",
    href: "/missions",
  },
];

export const privacySections = [
  {
    title: "What we collect",
    body: "Metcalfe stores account identity, project participation, camera metadata, and operational notifications needed to coordinate monitored construction sites.",
  },
  {
    title: "How access is limited",
    body: "Access is role-based and project-scoped. Sensitive footage, incident notes, and security controls are limited by permission tier and project assignment.",
  },
  {
    title: "Retention and review",
    body: "Operational logs and request histories are reviewed for compliance, while retention windows follow project requirements and support escalation needs.",
  },
];

export function humanizeSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function findProject(projectId: string) {
  return projects.find((project) => project.id === projectId) ?? projects[0];
}

export function getAddCameraSteps(projectId: string): WorkflowStep[] {
  return addCameraSteps.map((step) => ({
    ...step,
    href: `/projects/${projectId}/add-camera/${step.label.toLowerCase()}`,
  }));
}

export function getProjectActions(projectId: string) {
  return [
    {
      title: "Edit project details",
      description: "Update owner, location, and construction scope details.",
      href: `/projects/${projectId}/edit`,
    },
    {
      title: "Update operating status",
      description: "Log milestone updates, readiness notes, and field observations.",
      href: `/projects/${projectId}/update`,
    },
    {
      title: "Add camera coverage",
      description: "Launch the three-step camera deployment workflow.",
      href: `/projects/${projectId}/add-camera/device`,
    },
    {
      title: "Delete project",
      description: "Review the removal impact before deleting the record.",
      href: `/projects/${projectId}/delete`,
    },
  ];
}
