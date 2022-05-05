import { TestBed } from "@angular/core/testing";
import { Functions } from "@angular/fire/functions";
import { AuthService } from "../auth/auth.service";
import { EmailSearcherService } from "./email-searcher.service";

describe("EmailSearcherService", () => {
  let service: EmailSearcherService;

  beforeEach(() => {
    const functionsStub = () => ({});
    const authServiceStub = () => ({ currentUser: {} });
    TestBed.configureTestingModule({
      providers: [
        EmailSearcherService,
        { provide: Functions, useFactory: functionsStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(EmailSearcherService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
