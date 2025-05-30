import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";
import { RoleOutputDTO } from "../dto/role.dto";
import { RoleMapper } from "../mapper/RoleMapper";
import { Member } from "../entity/Member";
import { NotFoundException } from "../exception/NotFoundException";
import { encrypt } from "../helpers/encrypt";
import { UnauthorizedException } from "../exception/UnauthorizedException";
import { AuthOutputDTO, AuthPayload } from "../dto/auth.dto";

export interface AuthServiceInterface {
    authenticate(phone: string, password: string): Promise<AuthOutputDTO>;
}

export class AuthService implements AuthServiceInterface {
    private memberRepository: Repository<Member>;

    public constructor() {
        this.memberRepository = AppDataSource.getRepository(Member);
    }


    async authenticate(phone: string, password: string): Promise<AuthOutputDTO> {
        const member = await this.memberRepository.findOne({
            where: {
                phone: phone,
            },
            relations: {
                role: true,
            }
        });
        if(!member) {
            throw new NotFoundException('Nenhum conta encontrada com as credenciais');
        }

        const validCredentials = await encrypt.comparepassword(member.password, password);     
        if(!validCredentials) {
            throw new UnauthorizedException('Senha inválida');
        }
    
        const payload = <AuthPayload>{
            id: member.id,
            role: member.role.credentials,
        };
        const accessToken = encrypt.generateToken(payload);
        
        return new AuthOutputDTO(accessToken);
    }
}