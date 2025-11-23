import { TagType } from "@bitcoin-dev-project/bdp-ui"
import { ImageProps } from "next/image"
import { ComponentType } from "react"

export type ProjectProperties = {
    name: string
    repo_url: string
    org: string
    issue: string
    tags: string[]
    lang: string[]
}

export type Projects = {
    [key: string]: ProjectProperties
}

export type Issue = {
    title: string
    url: string
    number: number
    publishedAt: string
    labels: {
        edges: {
            node: {
                name: string
            }
        }[]
    }
}

export type RepositoryIssues = {
    url: string
    publishedAt: string
    title: string
    labels: string[]
    tags: string[]
    imageUrl: string
}

export type IssueCardElement = RepositoryIssues & {
    owner: string
    languages: string[]
    repo: string
    number: number
}

export interface IFeature {
    name: React.ReactNode
    summary: string
    description: string
    image: ImageProps["src"]
    icon?: ImageProps["src"]
    link: string
}

export type MottosNav = {
    name:string;
    slug:Mottos;
}
export type Mottos = "learn" | "contribute" | "career" | "get-funded"

// Filters
export interface FilterResourceType {
    tag:TagType;
    description: string;
}

// Curriculum for learn

export interface FooterLinkItem {
  name: string;
  link: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  component?: ComponentType<any>;
}

export interface FooterSection {
  name: string;
  links: FooterLinkItem[];
}