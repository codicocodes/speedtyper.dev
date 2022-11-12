import { Command, CommandRunner } from 'nest-commander';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { ChallengeService } from 'src/challenges/services/challenge.service';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectService } from 'src/projects/services/project.service';

@Command({
  name: 'seed-challenges',
  arguments: '',
  options: {},
})
export class ProjectSeedRunner extends CommandRunner {
  constructor(
    private projectService: ProjectService,
    private challengeService: ChallengeService,
  ) {
    super();
  }
  async run(): Promise<void> {
    const project = this.project_factory();
    await this.projectService.bulkUpsert([project]);
    const challenges = this.challenges_factory(project);
    await this.challengeService.upsert(challenges);
  }

  project_factory() {
    const project = new Project();
    project.id = '98dac57c-516e-485f-872a-4b9f6e1ad566';
    project.fullName = 'etcd-io/etcd';
    project.htmlUrl = 'https://github.com/etcd-io/etcd';
    project.language = 'Go';
    project.stars = 41403;
    project.licenseName = 'Apache License 2.0';
    project.ownerAvatar =
      'https://avatars.githubusercontent.com/u/41972792?v=4';
    project.defaultBranch = 'main';
    project.syncedSha = '2d638e0fd2c1d91c9c4323591bb1041b594e28fa';
    return project;
  }

  challenges_factory(project: Project) {
    const challenges = [];
    const firstChallenge = new Challenge();
    challenges.push(firstChallenge);
    firstChallenge.id = 'b4b6eec5-333c-4c77-a648-1b0884ae5ad0';
    firstChallenge.sha = 'fa3011cb39ac784a88da3667b729f3a79f5f22c3';
    firstChallenge.treeSha = '2d638e0fd2c1d91c9c4323591bb1041b594e28fa';
    firstChallenge.path = 'server/etcdserver/api/rafthttp/transport.go';
    firstChallenge.url =
      'https://github.com/etcd-io/etcd/blob/2d638e0fd2c1d91c9c4323591bb1041b594e28fa/server/etcdserver/api/rafthttp/transport.go/#L425';
    firstChallenge.content =
      'func (t *Transport) Pause() {\n' +
      '\tt.mu.RLock()\n' +
      '\tdefer t.mu.RUnlock()\n' +
      '\tfor _, p := range t.peers {\n' +
      '\t\tp.(Pausable).Pause()\n' +
      '\t}\n' +
      '}';
    firstChallenge.project = project;

    const secondChallenge = new Challenge();
    challenges.push(secondChallenge);
    secondChallenge.id = '8ebf6be1-7f7c-4edf-a622-97b0024636e8';
    secondChallenge.sha = '69ecc631471975fcb4d207f85a57baf2b5a79460';
    secondChallenge.treeSha = '2d638e0fd2c1d91c9c4323591bb1041b594e28fa';
    secondChallenge.path = 'client/v3/retry.go';
    secondChallenge.url =
      'https://github.com/etcd-io/etcd/blob/2d638e0fd2c1d91c9c4323591bb1041b594e28fa/client/v3/retry.go/#L160';
    secondChallenge.content =
      'func RetryClusterClient(c *Client) pb.ClusterClient {\n' +
      '\treturn &retryClusterClient{\n' +
      '\t\tcc: pb.NewClusterClient(c.conn),\n' +
      '\t}\n' +
      '}';
    secondChallenge.project = project;

    const thirdChallenge = new Challenge();
    challenges.push(thirdChallenge);
    thirdChallenge.id = '19174a2e-9220-40c8-832a-7effd351a68b';
    thirdChallenge.sha = 'ea19cf0181bbedbfc65bce9cfce26eb3558cb9ee';
    thirdChallenge.treeSha = '2d638e0fd2c1d91c9c4323591bb1041b594e28fa';
    thirdChallenge.path = 'pkg/schedule/schedule.go';
    thirdChallenge.url =
      'https://github.com/etcd-io/etcd/blob/2d638e0fd2c1d91c9c4323591bb1041b594e28fa/pkg/schedule/schedule.go/#L135';
    thirdChallenge.content =
      'func (f *fifo) Finished() int {\n' +
      '\tf.finishCond.L.Lock()\n' +
      '\tdefer f.finishCond.L.Unlock()\n' +
      '\treturn f.finished\n' +
      '}';
    thirdChallenge.project = project;

    return challenges;
  }
}
