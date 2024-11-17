import React, { useState } from "react"
import {
  ActionIcon,
  AppShell,
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { IProject } from "../../models/models"
import { useNavigate } from "react-router"
import { IconTrash } from "@tabler/icons-react"

const getStoredProjects = (): IProject[] => {
  const stored = localStorage.getItem("projects")
  if (!stored) return []

  const projects = JSON.parse(stored)
  return projects.map((project: IProject) => ({
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  }))
}

const Home = () => {
  const [projects, setProjects] = useState<IProject[]>(getStoredProjects())
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const handleCreateProject = () => {
    const newProject: IProject = {
      id: crypto.randomUUID(),
      name: `Project ${projects.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: [],
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const rows = projects.map((project) => (
    <Table.Tr
      key={project.name}
      bg={selectedRows.includes(project.id) ? theme.colors.blue[1] : undefined}
      onClick={(e) => {
        if (
          (e.target instanceof HTMLInputElement &&
            e.target.type === "checkbox") ||
          (e.target as HTMLElement)
            .closest("button")
            ?.getAttribute("aria-label") === "Delete"
        ) {
          return
        }
        navigate(`/project/${project.id}`)
      }}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(project.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, project.id]
                : selectedRows.filter((id) => id !== project.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{project.name}</Table.Td>
      <Table.Td>{project.createdAt.toLocaleDateString()}</Table.Td>
      <Table.Td>{project.updatedAt.toLocaleDateString()}</Table.Td>
      <Table.Td>{project.tasks.length}</Table.Td>
      <Table.Td>
        <ActionIcon
          aria-label="Delete"
          color="red"
          size="md"
          onClick={() => handleDeleteProject(project.id)}
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Title order={1}>To Do Flow</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Stack p="xl">
          <Title order={2} style={{ width: "fit-content" }}>
            Projects
          </Title>
          <Button w="fit-content" onClick={handleCreateProject}>
            Create Project
          </Button>

          {/* Table of projects */}
          <Table highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Th>Name</Table.Th>
                <Table.Th>Created At</Table.Th>
                <Table.Th>Updated At</Table.Th>
                <Table.Th>Total tasks</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default Home
