# Git Commit History Rewrite Prompt

## Overview
This prompt helps you clean up and reorganize your git commit history to make it more readable, logical, and professional. Since AI agents cannot perform interactive rebases directly, this guide focuses on analysis, planning, and generating executable instructions.

## AI-Assisted Commit Analysis

### Commit History Analysis Prompt
```
Analyze the following git log output and provide:
1. Logical groupings of related commits
2. Commits that should be squashed together
3. Commits that need better messages
4. Suggested rebase plan

Git log:
[paste your git log --oneline output here]
```

### Commit Message Generation Prompt
```
Convert these messy commit messages to conventional commit format:

Original commits:
- "fix stuff"
- "more changes"
- "oops forgot file"

Context: [describe what the commits actually do]

Generate clean conventional commits with proper types (feat/fix/docs/etc).
```

### Pre-Analysis Questions

Before rewriting your commit history, analyze your current state:

1. **What is the scope of changes?**
   - How many commits need to be cleaned up?
   - What time period does this cover?
   - Are there any merge commits that complicate the history?

2. **What are the logical groupings?**
   - Which commits belong together as a single feature/fix?
   - Are there any commits that should be split into smaller, atomic changes?
   - What is the natural flow of development that should be preserved?

3. **What is the target audience?**
   - Is this for a public repository or internal team?
   - What level of detail is appropriate for commit messages?
   - Are there any compliance or documentation requirements?

## Best Practices

### Conventional Commit Format
Use this structure for clean, consistent commit messages:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:** feat, fix, docs, style, refactor, test, chore, perf, ci, build

### Atomic Commits
- Each commit should represent one logical change
- Should be able to compile and pass tests independently
- Easy to review, revert, or cherry-pick

### Message Quality
- Use imperative mood ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Explain "what" and "why", not "how"
- Reference issues/tickets when relevant

## AI-Generated Rebase Plans

### Commit History Audit Prompt
```
Review this commit history for quality issues:

[paste git log --oneline --graph]

Identify:
- Anti-patterns (WIP commits, typo fixes, etc.)
- Missing conventional commit prefixes
- Commits that should be atomic
- Logical flow problems

Provide a numbered action plan.
```

### AI Command Generator
```
Given this commit analysis:
[paste your commit list and desired changes]

Generate the exact git commands I should execute, including:
- git reset/commit commands to restructure commits
- git cherry-pick commands to reorder commits
- git commit --amend commands to fix messages
- Step-by-step copy-pastable commands
```

## Step-by-Step Rewrite Process

### 1. Safety First
```bash
# Create a backup branch
git branch backup-before-rewrite

# Work on a feature branch if not already
git checkout -b clean-history
```

### 2. Generate Command Sequence (AI-Assisted)
Use the prompts above to analyze your commits and generate executable git commands.

### 3. AI-Generated Git Commands
Instead of interactive rebase, use these scriptable commands:

**Reset and recommit:**
```bash
# Reset N commits but keep changes
git reset --soft HEAD~N
# Create new clean commit
git commit -m "feat: clean commit message"
```

**Cherry-pick specific commits:**
```bash
# Pick commits in new order
git cherry-pick <commit-hash-1>
git cherry-pick <commit-hash-2>
```

**Amend commit messages:**
```bash
# Change last commit message
git commit --amend -m "fix: proper conventional commit"
```

**Squash commits:**
```bash
# Reset to base, keep all changes staged
git reset --soft HEAD~3
# Commit all changes as one
git commit -m "feat: combined feature implementation"
```

### 5. Advanced Techniques

**Split a commit:**
```bash
# During rebase, mark commit as 'edit'
git reset HEAD^
# Stage and commit changes separately
git add <files>
git commit -m "First logical change"
git add <other-files>
git commit -m "Second logical change"
git rebase --continue
```

**Amend last commit:**
```bash
git commit --amend -m "New commit message"
```

**Filter branch (for extensive rewrites):**
```bash
git filter-branch --msg-filter 'sed "s/old-pattern/new-pattern/"' HEAD
```

## Safety Warnings

⚠️ **NEVER rewrite history on shared/public branches**
⚠️ **Always create backups before starting**
⚠️ **Coordinate with team members if working on shared feature branches**
⚠️ **Test thoroughly after rewriting**

## Collaboration Considerations

- Only rewrite history on feature branches before merging
- Use `git push --force-with-lease` instead of `git push --force`
- Communicate with team when rewriting shared feature branches
- Consider using merge commits for collaboration instead of rebasing

## Example Workflow

```bash
# 1. Backup
git branch backup-$(date +%Y%m%d)

# 2. Get AI-generated commands
# (Use AI prompts above to generate specific commands)

# 3. Execute generated commands
git reset --soft HEAD~3
git commit -m "feat: implement user authentication system"

# 4. Force push to feature branch
git push --force-with-lease origin feature-branch

# 5. Create clean merge request
```

## Example AI Workflow

### 1. Get Commit History
```bash
git log --oneline -10
```

### 2. AI Analysis
Paste the output into this prompt:
```
Analyze these commits and generate git commands to clean them:

a1b2c3d feat: add user authentication
b2c3d4e fix typo in readme
c3d4e5f WIP: working on auth
d4e5f6g fix: auth validation bug
e5f6g7h more auth work
f6g7h8i docs: update auth docs

Goal: Clean history with logical, atomic commits

Generate exact git reset/commit/cherry-pick commands I can copy-paste.
```

### 3. Execute Generated Commands
Copy-paste the AI-generated git commands exactly as provided.

## Verification Checklist

After rewriting:
- [ ] All tests still pass
- [ ] Code compiles successfully
- [ ] Commit messages follow conventions
- [ ] Each commit is atomic and logical
- [ ] No sensitive information exposed
- [ ] Backup branch exists
- [ ] Team is notified if applicable
- [ ] AI-generated commands were executed correctly
